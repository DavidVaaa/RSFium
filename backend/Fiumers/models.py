from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    # Campos personalizados
    rol = models.TextField
    description = models.TextField(black=True)
    phone_number = models.CharField(max_length=12, blank=True)
    instagram = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    # Otros campos como nombre, correo electrónico, contraseña, etc., ya están incluidos por defecto en AbstractUser

class Student(CustomUser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.rol = 'Student'

class Staff(CustomUser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.rol = 'Staff'

class Teacher(CustomUser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.rol = 'Teacher'

class Admin(CustomUser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.rol = 'Admin'
