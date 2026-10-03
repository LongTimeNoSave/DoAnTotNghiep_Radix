import re

with open(r'd:\python\DoAnTotNghiep\frontend\src\index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We only want to keep the custom stuff we added at the bottom, which starts with .material-symbols-outlined
# Let's just find that index
idx = css.find('.material-symbols-outlined')
if idx != -1:
    custom_css = css[idx:]
    
    # Tailwind base directives (usually we would add @tailwind base; but we use CDN)
    new_css = custom_css
    with open(r'd:\python\DoAnTotNghiep\frontend\src\index.css', 'w', encoding='utf-8') as f:
        f.write(new_css)

# Clear App.css
with open(r'd:\python\DoAnTotNghiep\frontend\src\App.css', 'w', encoding='utf-8') as f:
    f.write('')

print('Fixed CSS')
