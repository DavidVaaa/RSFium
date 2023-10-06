from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('materias/', views.materias_del_alumno, name='materias_del_alumno'),
    path('materia/<int:materia_id>/unirse/', views.unirse_a_materia, name='unirse_a_materia'),
    path('materia/<int:materia_id>/chat/<int:chat_id>/comentario/', views.crear_comentario, name='crear_comentario'),
]
