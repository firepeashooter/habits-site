from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Make email unique and required in the database
    email = models.EmailField(unique=True)

    # Tell Django to use email as the unique identifier for logging in
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 

    def __str__(self):
        return self.email
