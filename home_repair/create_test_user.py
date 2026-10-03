import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User

# Xóa user cũ nếu có để tránh lỗi trùng lặp
if User.objects.filter(email='test@user.com').exists():
    User.objects.get(email='test@user.com').delete()

# Tạo user mới
user = User.objects.create_user(
    email='test@user.com',
    password='password123',
    role='customer'
)

print('Tạo thành công tài khoản test.')
