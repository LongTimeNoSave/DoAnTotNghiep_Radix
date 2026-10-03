import os
import django

# Remove old migrations
for app in ['users', 'orders']:
    mig_path = os.path.join(app, 'migrations', '0001_initial.py')
    if os.path.exists(mig_path):
        os.remove(mig_path)

# Run makemigrations and migrate
os.system('..\\.venv\\Scripts\\python.exe manage.py makemigrations')
os.system('..\\.venv\\Scripts\\python.exe manage.py migrate')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User

# Create superuser admin/admin
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@admin.com',
        password='admin',
        role='admin'
    )
    print("Created superuser username: admin, password: admin")
else:
    print("Superuser already exists")
