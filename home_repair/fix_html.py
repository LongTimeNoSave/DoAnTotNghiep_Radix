import urllib.request
import re

url = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M2ZWMyYmFmMzg1MDQwOTI5YjQ3ZjMyZjYyNjRiNTU4EgsSBxCZtKDflgEYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDkxOTczNDgyNjQxMTE4NTQyMQ&filename=&opi=96797242'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')

    # Replace the logo a tag
    old_a_tag_pattern = r'<a class="flex items-center gap-2 group" href="#">.*?</a>'
    new_a_tag = '''<a class="flex items-center gap-2 group" href="#">
<svg width="40" height="40" viewBox="0 0 100 100" fill="none" class="w-10 h-10 flex-shrink-0">
    <path d="M 20 28 A 38 38 0 0 0 20 72" stroke="#06B6D4" stroke-width="5" stroke-linecap="round" />
    <path d="M 80 28 A 38 38 0 0 1 80 72" stroke="#06B6D4" stroke-width="5" stroke-linecap="round" />
    <path d="M 32 38 A 22 22 0 0 0 32 62" stroke="#3B82F6" stroke-width="5" stroke-linecap="round" />
    <path d="M 68 38 A 22 22 0 0 1 68 62" stroke="#3B82F6" stroke-width="5" stroke-linecap="round" />
    <line x1="28" y1="28" x2="72" y2="72" stroke="#2563EB" stroke-width="7" stroke-linecap="round" />
    <line x1="72" y1="28" x2="28" y2="72" stroke="#2563EB" stroke-width="7" stroke-linecap="round" />
    <circle cx="50" cy="50" r="7" fill="#06B6D4" stroke="#0F172A" stroke-width="2.5" />
</svg>
<span class="text-xl font-headline font-extrabold tracking-tight text-on-surface">RADI<span class="text-tertiary-fixed-dim font-black" style="color: #06B6D4;">X</span></span>
</a>'''
    html = re.sub(old_a_tag_pattern, new_a_tag, html, flags=re.DOTALL)

    # Add whitespace-nowrap to nav
    nav_pattern = r'<nav class="hidden md:flex items-center gap-6 lg:gap-8">'
    new_nav = '<nav class="hidden md:flex items-center gap-6 lg:gap-8 whitespace-nowrap">'
    html = html.replace(nav_pattern, new_nav)

    with open('d:\\python\\DoAnTotNghiep\\home_repair\\index_stitch_fixed.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Success')
except Exception as e:
    print('Error:', e)
