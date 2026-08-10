import re

with open('e:\\origin of whatin\\whatin\\pages\\team.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(r'img: \'../images/([^\']+)\'', r'img: \'../images/\1?v=1.1\'', content)

with open('e:\\origin of whatin\\whatin\\pages\\team.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
    print("Fixed team.html image paths")
