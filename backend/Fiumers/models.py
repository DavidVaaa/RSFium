from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import validate_teacher_role


class CustomUser(AbstractUser):
    # Campos personalizados
    ROL_CHOICES = (
        ('Student', 'Student'),
        ('Staff', 'Staff'),
        ('Teacher', 'Teacher'),
    )

    rol = models.CharField(max_length=10, choices=ROL_CHOICES)
    description = models.TextField(blank=True)
    phone_number = models.CharField(max_length=12, blank=True)
    instagram = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    materias = models.ManyToManyField('Materia', related_name='users', blank=True)

    def tiene_rol_adecuado(self):
        # Lista de roles permitidos ("Student" y "Teacher")
        roles_permitidos = ["Student", "Teacher"]
        return self.rol in roles_permitidos


class Materia(models.Model):
    codigo = models.AutoField(primary_key=True)  # Utiliza AutoField para claves primarias automáticas
    nombre = models.CharField(max_length=255)
    profesor = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        validators=[validate_teacher_role]  # Usa la función de validación personalizada
    )
    nombre_profesor = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre


class UsuarioMateria(models.Model):
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.usuario} - {self.materia}"


class Evaluacion(models.Model):
    codigo_materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    fecha_evaluacion = models.DateField()

    def __str__(self):
        return self.nombre


class Debate(models.Model):
    evaluacion = models.ForeignKey(Evaluacion, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    fecha_nueva = models.DateField()
    fecha_original = models.DateField()

    def __str__(self):
        return self.nombre


class Chat(models.Model):
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre


class Comentario(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentario por {self.usuario} en {self.chat}"

    class Meta:
        ordering = ['-fecha_creacion']
