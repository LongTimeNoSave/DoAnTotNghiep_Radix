import re

# Read index_stitch_fixed.html to extract head elements
with open(r'd:\python\DoAnTotNghiep\home_repair\index_stitch_fixed.html', 'r', encoding='utf-8') as f:
    html_lines = f.readlines()

head_elements = ''.join(html_lines[6:84]) # From <!-- Fonts --> to end of script

# Read frontend index.html
with open(r'd:\python\DoAnTotNghiep\frontend\index.html', 'r', encoding='utf-8') as f:
    front_html = f.read()

# Replace <head> content
# Find </head> and insert before it
front_html = front_html.replace('</head>', f'{head_elements}\n  </head>')

with open(r'd:\python\DoAnTotNghiep\frontend\index.html', 'w', encoding='utf-8') as f:
    f.write(front_html)

print('Updated index.html')
