import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('technician', 'Technician'),
        ('admin', 'Admin'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    
    def __str__(self):
        return self.username

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
