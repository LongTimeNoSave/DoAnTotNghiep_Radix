import re
import os

with open(r'd:\python\DoAnTotNghiep\home_repair\index_stitch_fixed.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract styles
styles_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
styles = styles_match.group(1) if styles_match else ''

# Extract body
body_match = re.search(r'<body.*?>(.*?)</body>', html, re.DOTALL)
body = body_match.group(1) if body_match else ''

# Basic JSX conversions
body = body.replace('class=', 'className=')
body = body.replace('for=', 'htmlFor=')
body = body.replace('stroke-width=', 'strokeWidth=')
body = body.replace('stroke-linecap=', 'strokeLinecap=')
body = body.replace('stroke-linejoin=', 'strokeLinejoin=')
body = body.replace('fill-rule=', 'fillRule=')
body = body.replace('clip-rule=', 'clipRule=')
body = body.replace('viewBox=', 'viewBox=')
body = body.replace('tabindex=', 'tabIndex=')
body = body.replace('xmlns:xlink=', 'xmlnsXlink=')

# Convert inline styles (very basic, assuming format style="key: value;")
def style_replacer(match):
    style_content = match.group(1)
    # Simple parse
    parts = style_content.split(';')
    obj = []
    for part in parts:
        if ':' in part:
            k, v = part.split(':', 1)
            k = k.strip()
            # camelCase key
            k_parts = k.split('-')
            k = k_parts[0] + ''.join(x.capitalize() for x in k_parts[1:])
            v = v.strip().replace("'", '"')
            obj.append(f"'{k}': '{v}'")
    return "style={{" + ", ".join(obj) + "}}"

body = re.sub(r'style="(.*?)"', style_replacer, body)

# Self-close tags
body = re.sub(r'<(img|input|br|hr)(.*?[^/])>', r'<\1\2 />', body)
body = re.sub(r'<(img|input|br|hr)(.*?)/ >', r'<\1\2 />', body)
body = re.sub(r'<(path|circle|line|polygon|polyline)(.*?[^/])>', r'<\1\2 />', body)
# Remove closing tags for self-closed ones if they exist
body = re.sub(r'</(img|input|br|hr|path|circle|line|polygon|polyline)>', '', body)

# Convert HTML comments to JSX comments
body = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', body, flags=re.DOTALL)

jsx = f'''import React from \"react\";
import \"./App.css\";

function App() {{
  return (
    <div className=\"bg-background text-on-surface font-body antialiased selection:bg-primary-fixed selection:text-primary min-h-screen flex flex-col\">
      {{/* Original body content */}}
      {body}
    </div>
  );
}}

export default App;
'''

with open(r'd:\python\DoAnTotNghiep\frontend\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(jsx)

with open(r'd:\python\DoAnTotNghiep\frontend\src\index.css', 'a', encoding='utf-8') as f:
    f.write('\n' + styles)

print('Done converting body to JSX and appending styles to index.css')
