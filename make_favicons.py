import sys
import subprocess

try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

try:
    img = Image.open('logo.png').convert("RGBA")
    
    # Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    width, height = img.size
    max_dim = max(width, height)
    
    # 90% fill ratio -> canvas = max_dim / 0.9
    new_size = int(max_dim / 0.9)
    canvas = Image.new("RGBA", (new_size, new_size), (255, 255, 255, 0))
    
    offset = ((new_size - width) // 2, (new_size - height) // 2)
    canvas.paste(img, offset)
    
    # Use Resampling.LANCZOS if available, else ANTIALIAS (for older Pillow)
    resample_filter = getattr(Image, 'Resampling', Image).LANCZOS
    
    canvas.resize((16, 16), resample_filter).save('favicon-16x16.png')
    canvas.resize((32, 32), resample_filter).save('favicon-32x32.png')
    canvas.resize((180, 180), resample_filter).save('apple-touch-icon.png')
    
    canvas.save('favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
    print('SUCCESS')
except Exception as e:
    print('ERROR: ' + str(e))
