from django.urls import path
from .views import ChatListCreateView, MessageListCreateView

urlpatterns = [
    # URL para listar y crear chats
    path('api/chats/', ChatListCreateView.as_view(), name='chat-list-create'),

    # URL para listar y crear mensajes en un chat específico
    path('api/chats/<int:chat_id>/messages/', MessageListCreateView.as_view(), name='message-list-create'),
]
