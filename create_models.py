import os

users_models = '''import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('technician', 'Technician'),
        ('admin', 'Admin'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None # Remove username field
    email = models.EmailField(unique=True, max_length=255)
    phone = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()

    def __str__(self):
        return self.email

class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='customer_profile')
    address = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"Customer: {self.user.email}"

class TechnicianProfile(models.Model):
    APPROVAL_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='technician_profile')
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    is_available = models.BooleanField(default=True)
    approval_status = models.CharField(max_length=20, choices=APPROVAL_CHOICES, default='pending')
    acceptance_rate = models.FloatField(default=0.0)
    reputation_score = models.FloatField(default=0.0)

    def __str__(self):
        return f"Technician: {self.user.email}"
'''

orders_models = '''import uuid
from django.db import models

class ServiceCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
'''

with open(r'd:\python\DoAnTotNghiep\home_repair\users\models.py', 'w', encoding='utf-8') as f:
    f.write(users_models)

with open(r'd:\python\DoAnTotNghiep\home_repair\orders\models.py', 'w', encoding='utf-8') as f:
    f.write(orders_models)

# Update settings.py
with open(r'd:\python\DoAnTotNghiep\home_repair\config\settings.py', 'r', encoding='utf-8') as f:
    settings = f.read()

if 'AUTH_USER_MODEL' not in settings:
    settings += '\nAUTH_USER_MODEL = "users.User"\n'

with open(r'd:\python\DoAnTotNghiep\home_repair\config\settings.py', 'w', encoding='utf-8') as f:
    f.write(settings)

print('Models created successfully.')
