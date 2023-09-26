# routing.py

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from chat import consumers

application = ProtocolTypeRouter(
    {
        "websocket": AuthMiddlewareStack(
            URLRouter([path("ws/chat/<str:room_name>/", consumers.ChatConsumer.as_asgi())])
        )
    }
)
