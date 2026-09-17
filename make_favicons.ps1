Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile("c:\templet\logo.png")
$bmp = New-Object System.Drawing.Bitmap($img)

$minX = $bmp.Width
$minY = $bmp.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$croppedWidth = [int]($maxX - $minX + 1)
$croppedHeight = [int]($maxY - $minY + 1)

Write-Host "Cropped dimensions: ${croppedWidth}x${croppedHeight}"

if ($croppedWidth -le 0 -or $croppedHeight -le 0) {
    Write-Host "Image is fully transparent"
    exit 1
}

$rect = New-Object System.Drawing.Rectangle($minX, $minY, $croppedWidth, $croppedHeight)
$croppedBmp = $bmp.Clone($rect, $bmp.PixelFormat)

$maxDim = [Math]::Max($croppedWidth, $croppedHeight)
$newSize = [int][Math]::Round($maxDim / 0.9)

Write-Host "New Canvas size: ${newSize}x${newSize}"

$canvas = New-Object System.Drawing.Bitmap($newSize, $newSize)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.Clear([System.Drawing.Color]::Transparent)

$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$offsetX = [int][Math]::Round(($newSize - $croppedWidth) / 2.0)
$offsetY = [int][Math]::Round(($newSize - $croppedHeight) / 2.0)

$g.DrawImage($croppedBmp, $offsetX, $offsetY, $croppedWidth, $croppedHeight)
$g.Dispose()

Function Save-Resized {
    param([int]$size, [string]$path)
    $resized = New-Object System.Drawing.Bitmap($size, $size)
    $gr = [System.Drawing.Graphics]::FromImage($resized)
    $gr.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gr.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $gr.DrawImage($canvas, 0, 0, $size, $size)
    $resized.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $gr.Dispose()
    $resized.Dispose()
}

Save-Resized 16 "c:\templet\favicon-16x16.png"
Save-Resized 32 "c:\templet\favicon-32x32.png"
Save-Resized 180 "c:\templet\apple-touch-icon.png"

$resizedIco = New-Object System.Drawing.Bitmap(32, 32)
$grIco = [System.Drawing.Graphics]::FromImage($resizedIco)
$grIco.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$grIco.DrawImage($canvas, 0, 0, 32, 32)
$resizedIco.Save("c:\templet\favicon.ico", [System.Drawing.Imaging.ImageFormat]::Png)
$grIco.Dispose()
$resizedIco.Dispose()

$croppedBmp.Dispose()
$bmp.Dispose()
$img.Dispose()
$canvas.Dispose()

Write-Host "Images processed successfully."
