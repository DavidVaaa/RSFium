from django.db import models

class Subject(models.Model):
    id_subject = models.IntegerField(primary_key=True)
    name_subject = models.CharField(max_length=255)

    def __str__(self):
        return self.name_subject

class User(models.Model):
    id_user = models.IntegerField(primary_key=True)
    name_user = models.CharField(max_length=255)

    def __str__(self):
        return self.name_user

class Student(User):
    generation = models.IntegerField()
    orientation = models.CharField(max_length=255)

class Crew(User):
    pass

class Teacher(User):
    pass

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

