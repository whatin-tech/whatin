import re

with open('e:\\origin of whatin\\whatin\\pages\\team.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any escaped single quotes with regular single quotes, and make sure we have ?v=2
new_content = re.sub(r"img:\s*\\'(\.\./images/[^\?']+)[\?v=0-9\.]*\\'", r"img: '\1?v=2'", content)
new_content = re.sub(r"img:\s*'(\.\./images/[^\?']+)[\?v=0-9\.]*'", r"img: '\1?v=2'", new_content)

with open('e:\\origin of whatin\\whatin\\pages\\team.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
    print("Fixed team.html image paths again")
