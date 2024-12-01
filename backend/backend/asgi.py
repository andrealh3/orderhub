"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from backend.routing import websocket_urlpatterns
from django.core.asgi import get_asgi_application

env = os.getenv('DJANGO_ENV', 'desarrollo')

if env == 'produccion':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.prod')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.dev')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
