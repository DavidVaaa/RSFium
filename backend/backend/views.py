from django.shortcuts import render
from .models import Chat  

def lista_de_chats(request):
    chats = Chat.objects.all()  # Obtén todos los chats de la base de datos
    return render(request, 'lista_chats.html', {'chats': chats})


