from django.db import models

class Materia(models.Model):
    # Define the primary key for the model
    id_subject = models.IntegerField(primary_key=True)

    # Define the name field for the model
    name_subject = models.CharField(max_length=255)

    # Define the string representation for the model
    def __str__(self):
        return self.name_subject

# class User(models.Model):
#     id_user = models.IntegerField(primary_key=True)
#     name_user = models.CharField()

#     # Define the string representation for the model
#     def __str__(self):
#         return self.name_user

# class Student(User):
#     generation = models.IntegerField()
#     orientation = models.CharField()

# class Crew(User):
#     rol = models.

