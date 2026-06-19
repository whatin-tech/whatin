import os
import re

ROOT_DIR = r"e:\origin of whatin\whatin"

ad_domains = ['5gvci.com', 'al5sm.com', 'quge5.com', 'nap5k.com', 'n6wxm.com', 'omg10.com', 'quidom.com', 'profitblecpm']

def remove_ads(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Remove script tags that contain any of the ad domains
    for domain in ad_domains:
        # Regex to match <script ... domain ... ></script> or inline scripts
        pattern = re.compile(rf'<script[^>]*{domain}[^>]*>.*?</script>', re.DOTALL | re.IGNORECASE)
        content = pattern.sub('', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned ads from {filepath}")

def main():
    for root, dirs, files in os.walk(ROOT_DIR):
        if '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                remove_ads(os.path.join(root, file))

if __name__ == '__main__':
    main()
