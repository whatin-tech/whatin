import os
import re

ROOT_DIR = r"e:\origin of whatin\whatin"

HEADER_TEMPLATE_ROOT = """    <header id="main-header">
        <div class="container header-content">
            <div class="logo" onclick="window.location.href='index.html'">WHATIN <span class="emoji-ml custom-emoji"></span></div>
            <nav id="nav-menu">
                <ul style="align-items: center; margin: 0;">
                    <li><a href="index.html" class="active">Home</a></li>
                    <li><a href="pages/about.html">Story</a></li>
                    <li><a href="guidance.html">Guidance</a></li>
                    <li><a href="index.html#projects">Resources</a></li>
                    <li><a href="index.html#projects" class="clay-btn bg-pink" style="padding: 0.6rem 1.5rem; font-size: 0.9rem; border-radius: 50px;">Start Learning Now</a></li>
                </ul>
            </nav>
            <div class="theme-toggle" id="theme-toggle"
                style="margin-left: 20px; cursor: pointer; font-size: 1.3rem; color: var(--text-secondary); transition: 0.3s; display: flex; align-items: center; z-index: 1001;">
                <i class="fas fa-sun" id="theme-icon"></i>
            </div>
            <div class="mobile-menu-btn" id="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>"""

HEADER_TEMPLATE_SUB = """    <header id="main-header">
        <div class="container header-content">
            <div class="logo" onclick="window.location.href='../index.html'">WHATIN <span class="emoji-ml custom-emoji"></span></div>
            <nav id="nav-menu">
                <ul style="align-items: center; margin: 0;">
                    <li><a href="../index.html" class="active">Home</a></li>
                    <li><a href="about.html">Story</a></li>
                    <li><a href="../guidance.html">Guidance</a></li>
                    <li><a href="../index.html#projects">Resources</a></li>
                    <li><a href="../index.html#projects" class="clay-btn bg-pink" style="padding: 0.6rem 1.5rem; font-size: 0.9rem; border-radius: 50px;">Start Learning Now</a></li>
                </ul>
            </nav>
            <div class="theme-toggle" id="theme-toggle"
                style="margin-left: 20px; cursor: pointer; font-size: 1.3rem; color: var(--text-secondary); transition: 0.3s; display: flex; align-items: center; z-index: 1001;">
                <i class="fas fa-sun" id="theme-icon"></i>
            </div>
            <div class="mobile-menu-btn" id="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>"""

def replace_header_in_file(filepath, is_subpage):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find the <header id="main-header">...</header> block
    # It handles newlines and multiple spaces
    header_pattern = re.compile(r'<header id="main-header">.*?</header>', re.DOTALL)
    
    template = HEADER_TEMPLATE_SUB if is_subpage else HEADER_TEMPLATE_ROOT
    
    if not header_pattern.search(content):
        print(f"Skipping {filepath} - no main-header found.")
        return False
        
    new_content = header_pattern.sub(template, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated header in {filepath}")
        return True
    return False

def main():
    root_files = [f for f in os.listdir(ROOT_DIR) if f.endswith('.html')]
    pages_dir = os.path.join(ROOT_DIR, 'pages')
    sub_files = [f for f in os.listdir(pages_dir) if f.endswith('.html')]

    for f in root_files:
        replace_header_in_file(os.path.join(ROOT_DIR, f), False)
        
    for f in sub_files:
        replace_header_in_file(os.path.join(pages_dir, f), True)

if __name__ == '__main__':
    main()
