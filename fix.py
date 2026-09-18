import os
import re

dir_path = r'c:\templet'
files = [f for f in os.listdir(dir_path) if f.endswith('.html')]

for f in files:
    path = os.path.join(dir_path, f)
    with open(path, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    
    # 1. Purge any remaining videos, iframes
    content = re.sub(r'(?s)<video.*?</video>', '', content)
    content = re.sub(r'(?s)<iframe.*?</iframe>', '', content)
    
    # 2. Fix corrupted titles
    content = re.sub(r'<title>.*?</title>', '<title>عقل في صندوق | صومعة السيادة الفكرية</title>', content)
    
    # 3. Clean any orphaned code blocks at the top of the body
    # Sometimes regex left '        >' or similar. Let's look for stray characters after <body>
    
    # 4. Human grade text overwrite
    content = content.replace('O1U,U, U?US OU+O_U^U,', 'عقل في صندوق')
    
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)

# Fix dashboard.js text
dash_path = os.path.join(dir_path, 'dashboard.js')
if os.path.exists(dash_path):
    with open(dash_path, 'r', encoding='utf-8', errors='ignore') as file:
        dash_content = file.read()
        
    dash_content = dash_content.replace('Welcome to your space', 'مرحباً بك في صومعة السيادة الفكرية')
    dash_content = dash_content.replace('Ask AI', 'استنطق الحكيم')
    
    with open(dash_path, 'w', encoding='utf-8') as file:
        file.write(dash_content)

print("Purged videos and fixed text.")