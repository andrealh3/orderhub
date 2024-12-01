from channels.generic.websocket import AsyncWebsocketConsumer
import json

class MesaPedidosConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """
        Se ejecuta cuando un cliente se conecta al WebSocket.
        Se une al grupo correspondiente a la mesa.
        """
        self.mesa_id = self.scope['url_route']['kwargs']['mesa_id']
        self.room_group_name = f"mesa_{self.mesa_id}"

        # Unirse al grupo WebSocket de la mesa
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        """
        Se ejecuta cuando un cliente se desconecta del WebSocket.
        Sale del grupo correspondiente a la mesa.
        """
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def mesa_pedidos_update(self, event):
        """
        Recibe la actualización de los pedidos desde el grupo WebSocket
        y la envía al cliente.
        """
        pedidos = event['pedidos']

        # Envía los pedidos actualizados al cliente
        await self.send(text_data=json.dumps({
            'type': 'pedidos_update',
            'pedidos': pedidos
        }))


# # consumers.py
# import json
# from channels.generic.websocket import AsyncWebsocketConsumer

# class PedidoConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.mesa_id = self.scope['url_route']['kwargs']['mesa_id']
#         self.room_group_name = f"mesa_{self.mesa_id}"

#         # Unirse al grupo de la mesa
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )

#         await self.accept()

#     async def disconnect(self, close_code):
#         # Salir del grupo de la mesa
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         """
#         Maneja mensajes entrantes desde el cliente WebSocket.
#         """
#         data = json.loads(text_data)
#         pedido_data = data.get('pedido_data')  # El nombre del campo debe coincidir con lo que envíes

#         # Validar y procesar el pedido (puedes agregar lógica de validación aquí)
#         if not pedido_data:
#             print("f")
#             # Si no se proporciona 'pedido_data', puedes manejarlo aquí
#             return

#         # Enviar el pedido a todos los miembros del grupo
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type': 'pedido_message',
#                 'pedido_data': pedido_data
#             }
#         )

#     async def pedido_message(self, event):
#         """
#         Envía el pedido recibido a los clientes conectados al grupo.
#         """
#         pedido_data = event['pedido_data']

#         await self.send(text_data=json.dumps({
#             'pedido_data': pedido_data
#         }))
