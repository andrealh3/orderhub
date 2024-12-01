from django.urls import path
from orderhub.consumers import MesaPedidosConsumer

websocket_urlpatterns = [
    path("ws/pedidos/<int:mesa_id>/", MesaPedidosConsumer.as_asgi()),
]