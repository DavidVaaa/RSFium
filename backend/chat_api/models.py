from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Chat(models.Model):
    id_chat = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    related_subject = models.ForeignKey(Materia, on_delete=models.SET_NULL, null=True)

class Message(models.Model):
    id = models.IntegerField(primary_key=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)
    timestamp = models.DateTimeField()

