import os
import re

def fix_html_files(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or 'dist' in root or '.git' in root:
            continue
            
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replacements
                new_content = re.sub(r'<script\s+src="(\.\./)?js/script\.js[^"]*"\s*></script>', r'<script type="module" src="\1js/script.js"></script>', content)
                new_content = re.sub(r'<script\s+src="(\.\./)?animations/animations\.js"\s*></script>', r'<script type="module" src="\1animations/animations.js"></script>', new_content)
                new_content = re.sub(r'<script\s+src="react/app\.jsx"\s*></script>', r'<script type="module" src="react/app.jsx"></script>', new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {filepath}")

fix_html_files('e:\\origin of whatin\\whatin')
