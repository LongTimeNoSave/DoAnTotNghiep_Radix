import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User

# Check if admin already exists
if not User.objects.filter(email='admin@admin.com').exists():
    # Create superuser
    User.objects.create_superuser(
        email='admin@admin.com',
        password='admin'
    )
    print("Created superuser admin@admin.com")
else:
    print("Superuser already exists")
