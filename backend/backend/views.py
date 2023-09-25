from django.shortcuts import render
from .models import Chat  

def chat_list(request):
    chats = Chat.objects.all()
    return render(request, 'backend/chat_list.html', {'chats': chats})
