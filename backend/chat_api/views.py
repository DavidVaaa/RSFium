from django.shortcuts import render

# Create your views here.
# Importa las clases necesarias de Django REST framework y tu modelo
from rest_framework import generics
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

# Vista para listar y crear chats
class ChatListCreateView(generics.ListCreateAPIView):
    # Obtiene todos los chats de la base de datos
    queryset = Chat.objects.all()
    # Utiliza el serializador ChatSerializer para convertir los objetos Chat en JSON y viceversa
    serializer_class = ChatSerializer

# Vista para listar y crear mensajes en un chat específico
class MessageListCreateView(generics.ListCreateAPIView):
    # Utiliza el serializador MessageSerializer para convertir los objetos Message en JSON y viceversa
    serializer_class = MessageSerializer

    # Método para obtener el conjunto de mensajes que se mostrarán en la lista
    def get_queryset(self):
        # Obtiene el chat_id de los parámetros de la URL
        chat_id = self.kwargs['chat_id']
        # Filtra los mensajes basados en el chat_id, para obtener solo los mensajes relacionados con ese chat
        return Message.objects.filter(chat_id=chat_id)

    # Método que se ejecuta cuando se crea un nuevo mensaje en el chat
    def perform_create(self, serializer):
        # Obtiene el chat_id de los parámetros de la URL
        chat_id = self.kwargs['chat_id']
        # Busca el chat correspondiente en la base de datos
        chat = Chat.objects.get(id_chat=chat_id)
        # Guarda el mensaje en el chat y lo asocia con el usuario que hizo la solicitud
        serializer.save(chat=chat, user=self.request.user)
