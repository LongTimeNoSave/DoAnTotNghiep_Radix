import re

with open(r'd:\python\DoAnTotNghiep\frontend\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix banner image path and onError
content = content.replace('src="banner.jpg"', 'src="/banner.jpg"')
content = content.replace('onerror="this.src=\'https://placehold.co/600x600/png?text=Hinh+Anh+Quang+Cao\'"', 'onError={(e) => { e.target.onerror = null; e.target.src = \'https://placehold.co/600x600/png?text=Hinh+Anh+Quang+Cao\'; }}')

with open(r'd:\python\DoAnTotNghiep\frontend\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed image tag in App.jsx')
