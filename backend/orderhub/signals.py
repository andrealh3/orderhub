from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Pedido

@receiver(post_save, sender=Pedido)
def pedido_creado_actualizado(sender, instance, **kwargs):
    if instance.mesa:
        channel_layer = get_channel_layer()
        room_group_name = f"mesa_{instance.mesa.id}"

        # Serializar los pedidos actuales
        pedidos = list(instance.mesa.pedido.values(
            'id', 
            'estado', 
            'fecha',  # Convertir fecha a string
            'hora',
            'en_linea',
            'cerrado'
        ))

        # Convertir fecha y hora a strings
        for pedido in pedidos:
            pedido['fecha'] = pedido['fecha'].isoformat()  # Asegurarse que sea un string
            pedido['hora'] = pedido['hora'].isoformat()    # Asegurarse que sea un string

        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                'type': 'mesa_pedidos_update',
                'pedidos': pedidos
            }
        )

@receiver(post_delete, sender=Pedido)
def pedido_eliminado(sender, instance, **kwargs):
    if instance.mesa:
        channel_layer = get_channel_layer()
        room_group_name = f"mesa_{instance.mesa.id}"

        # Serializar los pedidos actuales
        pedidos = list(instance.mesa.pedido.values(
            'id', 
            'estado', 
            'fecha',  # Convertir fecha a string
            'hora',
            'en_linea',
            'cerrado'
        ))

        # Convertir fecha y hora a strings
        for pedido in pedidos:
            pedido['fecha'] = pedido['fecha'].isoformat()  # Asegurarse que sea un string
            pedido['hora'] = pedido['hora'].isoformat()    # Asegurarse que sea un string

        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                'type': 'mesa_pedidos_update',
                'pedidos': pedidos
            }
        )
