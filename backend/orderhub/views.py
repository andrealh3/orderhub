from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import *
from .serializers import *
from rest_framework.decorators import action
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

class UserApiViewSet(ModelViewSet):
    """
    Detalles de la API para los usuarios.

    Funciones disponibles:

    list: 
        Retorna una lista de todos los usuarios disponibles.

    create:
        Crea un nuevo usuario con la información proporcionada.
        
        Parámetros:
            username (str): Nombre de usuario.
            password (str): Contraseña del usuario.
        
        Respuestas:
            dict: Usuario creado.
            
    retrieve: 
        Obtiene los detalles de un usuario basado en su ID.
        
        Parámetros:
            id (int): ID del usuario.
        
        Respuestas:
            dict: Detalle del usuario solicitado.

    update: 
        Actualiza un usuario existente.
        
        Parámetros:
            id (int): ID del usuario a actualizar.
            username (str): Nombre de usuario.
            password (str): Contraseña del usuario.
        
        Respuestas:
            dict: Usuario actualizado.

    partial_update:
        Actualiza arcialmente un usuario existente.
        
        Parámetros:
            id (int): ID del usuario a actualizar.
            username (str, opcional): Nombre de usuario.
            password (str, opcional): Contraseña del usuario.
        
        Respuestas:
            dict: Usuario actualizado.

    delete: 
        Elimina un usuario existente.
        
        Parámetros:
            id (int): ID del usuario que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']

    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        user = serializer.instance

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({
            'user': serializer.data,
            'accessToken': access_token,
            'refreshToken': refresh_token
        }, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        password = request.data.get('password')
        if password:
            request.data['password'] = make_password(password)
        return super().partial_update(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()

        password = request.data.get('password')
        if password:
            request.data['password'] = make_password(password)

        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UserView(APIView):
    """
    Detalles de la API para obtener los detalles del usuario autenticado.

    Funciones disponibles:
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Obtiene los detalles del usuario autenticado.
        
        Respuestas:
            dict: Detalle del usuario autenticado.
        """

        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class MesaViewSet(ModelViewSet):
    """
    Detalles de la API para las mesas.

    Funciones disponibles:

    list: 
        Retorna una lista de todas las mesas disponibles.

    create: 
        Crea una nueva mesa con la información proporcionada.
        
        Parámetros:
            numero (int): Número de la mesa.
        
        Respuestas:
            dict: Mesa creada.

    retrieve: 
        Obtiene los detalles de una mesa basada en su ID.
        
        Parámetros:
            id (int): ID de la mesa.
        
        Respuestas:
            dict: Detalle de la mesa solicitada.

    update: 
        Actualiza una mesa existente.
        
        Parámetros:
            id (int): ID de la mesa a actualizar.
            numero (int): Número de la mesa.
        
        Respuestas:
            dict: Mesa actualizada.

    partial_update: 
        Actualiza parcialmente una mesa existente.
        
        Parámetros:
            id (int): ID de la mesa a actualizar.
            numero (int, opcional): Número de la mesa.
        
        Respuestas:
            dict: Mesa actualizada.

    delete: 
        Elimina una mesa existente.
        
        Parámetros:
            id (int): ID de la mesa que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = MesaSerializer
    queryset = Mesa.objects.all().order_by('numero')

class CategoriaViewSet(ModelViewSet):
    """
    Detalles de la API para las categorías.

    Funciones disponibles:

    list: 
        Retorna una lista de todas las categorías disponibles.

    create: 
        Crea una nueva categoría con la información proporcionada.
        
        Parámetros:
            nombre (str): Nombre de la categoría.
        
        Respuestas:
            dict: Categoría creada.

    retrieve: 
        Obtiene los detalles de una categoría basada en su ID.
        
        Parámetros:
            id (int): ID de la categoría.
        
        Respuestas:
            dict: Detalle de la categoría solicitada.

    update: 
        Actualiza una categoría existente.
        
        Parámetros:
            id (int): ID de la categoría a actualizar.
            nombre (str): Nombre de la categoría.
        
        Respuestas:
            dict: Categoría actualizada.

    partial_update: 
        Actualiza parcialmente una categoría existente.
        
        Parámetros:
            id (int): ID de la categoría a actualizar.
            nombre (str, opcional): Nombre de la categoría.
        
        Respuestas:
            dict: Categoría actualizada.

    delete: 
        Elimina una categoría existente.
        
        Parámetros:
            id (int): ID de la categoría que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()
    parser_classes = (MultiPartParser, FormParser)


class ProductoViewSet(ModelViewSet):
    """
    Detalles de la API para los productos.

    Funciones disponibles:

    list: 
        Retorna una lista de todos los productos disponibles.

    create: 
        Crea un nuevo producto con la información proporcionada.
        
        Parámetros:
            nombre (str): Nombre del producto.
            precio (decimal): Precio del producto.
            categoria (int): ID de la categoría a la que pertenece el producto.
        
        Respuestas:
            dict: Producto creado.

    retrieve: 
        Obtiene los detalles de un producto basado en su ID.
        
        Parámetros:
            id (int): ID del producto.
        
        Respuestas:
            dict: Detalle del producto solicitado.

    update: 
        Actualiza un producto existente.
        
        Parámetros:
            id (int): ID del producto a actualizar.
            nombre (str): Nombre del producto.
            precio (decimal): Precio del producto.
            categoria (int): ID de la categoría a la que pertenece el producto.
        
        Respuestas:
            dict: Producto actualizado.

    partial_update: 
        Actualiza parcialmente un producto existente.
        
        Parámetros:
            id (int): ID del producto a actualizar.
            nombre (str, opcional): Nombre del producto.
            precio (decimal, opcional): Precio del producto.
            categoria (int, opcional): ID de la categoría a la que pertenece el producto.
        
        Respuestas:
            dict: Producto actualizado.

    delete: 
        Elimina un producto existente.
        
        Parámetros:
            id (int): ID del producto que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['categoria', 'activo']


class PedidoViewSet(ModelViewSet):
    """
    Detalles de la API para los pedidos.

    Funciones disponibles:

    list: 
        Retorna una lista de todos los pedidos disponibles.

    create: 
        Crea un nuevo pedido con la información proporcionada.
        
        Parámetros:
            cliente (int): ID del cliente.
            fecha (datetime): Fecha del pedido.
        
        Respuestas:
            dict: Pedido creado.

    retrieve: 
        Obtiene los detalles de un pedido basado en su ID.
        
        Parámetros:
            id (int): ID del pedido.
        
        Respuestas:
            dict: Detalle del pedido solicitado.

    update: 
        Actualiza un pedido existente.
        
        Parámetros:
            id (int): ID del pedido a actualizar.
            cliente (int): ID del cliente.
            fecha (datetime): Fecha del pedido.
        
        Respuestas:
            dict: Pedido actualizado.

    partial_update: 
        Actualiza parcialmente un pedido existente.
        
        Parámetros:
            id (int): ID del pedido a actualizar.
            cliente (int, opcional): ID del cliente.
            fecha (datetime, opcional): Fecha del pedido.
        
        Respuestas:
            dict: Pedido actualizado.

    delete: 
        Elimina un pedido existente.
        
        Parámetros:
            id (int): ID del pedido que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['mesa']
    ordering_fields = '__all__'
    ordering = ['id']


class DetallePedidoViewSet(ModelViewSet):
    """
    Detalles de la API para los detalles del pedido.

    Funciones disponibles:

    list: 
        Retorna una lista de todos los detalles de pedidos disponibles.

    create: 
        Crea un nuevo detalle de pedido con la información proporcionada.
        
        Parámetros:
            pedido (int): ID del pedido asociado.
            producto (int): ID del producto.
            cantidad (int): Cantidad del producto en el pedido.
        
        Respuestas:
            dict: Detalle del pedido creado.

    retrieve: 
        Obtiene los detalles de un detalle de pedido basado en su ID.
        
        Parámetros:
            id (int): ID del detalle de pedido.
        
        Respuestas:
            dict: Detalle del pedido solicitado.

    update: 
        Actualiza un detalle de pedido existente.
        
        Parámetros:
            id (int): ID del detalle de pedido a actualizar.
            pedido (int): ID del pedido asociado.
            producto (int): ID del producto.
            cantidad (int): Cantidad del producto en el pedido.
        
        Respuestas:
            dict: Detalle del pedido actualizado.

    partial_update: 
        Actualiza parcialmente un detalle de pedido existente.
        
        Parámetros:
            id (int): ID del detalle de pedido a actualizar.
            pedido (int, opcional): ID del pedido asociado.
            producto (int, opcional): ID del producto.
            cantidad (int, opcional): Cantidad del producto en el pedido.
        
        Respuestas:
            dict: Detalle del pedido actualizado.

    delete: 
        Elimina un detalle de pedido existente.
        
        Parámetros:
            id (int): ID del detalle de pedido que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = DetallePedidoSerializer
    queryset = DetallePedido.objects.all()


class PagoViewSet(ModelViewSet):
    """
    Detalles de la API para los pagos.

    Funciones disponibles:

    list: 
        Retorna una lista de todos los pagos disponibles.

    create: 
        Crea un nuevo pago con la información proporcionada.
        
        Parámetros:
            pedido (int): ID del pedido asociado.
            monto (decimal): Monto del pago.
        
        Respuestas:
            dict: Pago creado.

    retrieve: 
        Obtiene los detalles de un pago basado en su ID.
        
        Parámetros:
            id (int): ID del pago.
        
        Respuestas:
            dict: Detalle del pago solicitado.

    update: 
        Actualiza un pago existente.
        
        Parámetros:
            id (int): ID del pago a actualizar.
            pedido (int): ID del pedido asociado.
            monto (decimal): Monto del pago.
        
        Respuestas:
            dict: Pago actualizado.

    partial_update: 
        Actualiza parcialmente un pago existente.
        
        Parámetros:
            id (int): ID del pago a actualizar.
            pedido (int, opcional): ID del pedido asociado.
            monto (decimal, opcional): Monto del pago.
        
        Respuestas:
            dict: Pago actualizado.

    delete: 
        Elimina un pago existente.
        
        Parámetros:
            id (int): ID del pago que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = PagoSerializer
    queryset = Pago.objects.all()


class FacturaViewSet(ModelViewSet):
    """
    Detalles de la API para las facturas.

    Funciones disponibles:

    list: 
        Retorna una lista de todas las facturas disponibles.

    create: 
        Crea una nueva factura con la información proporcionada.
        
        Parámetros:
            pedido (int): ID del pedido asociado.
            fecha (datetime): Fecha de la factura.
        
        Respuestas:
            dict: Factura creada.

    retrieve: 
        Obtiene los detalles de una factura basada en su ID.
        
        Parámetros:
            id (int): ID de la factura.
        
        Respuestas:
            dict: Detalle de la factura solicitada.

    update: 
        Actualiza una factura existente.
        
        Parámetros:
            id (int): ID de la factura a actualizar.
            pedido (int): ID del pedido asociado.
            fecha (datetime): Fecha de la factura.
        
        Respuestas:
            dict: Factura actualizada.

    partial_update: 
        Actualiza parcialmente una factura existente.
        
        Parámetros:
            id (int): ID de la factura a actualizar.
            pedido (int, opcional): ID del pedido asociado.
            fecha (datetime, opcional): Fecha de la factura.
        
        Respuestas:
            dict: Factura actualizada.

    delete: 
        Elimina una factura existente.
        
        Parámetros:
            id (int): ID de la factura que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = FacturaSerializer
    queryset = Factura.objects.all()


class DetalleFacturaViewSet(ModelViewSet):
    """
    Detalles de la API para los detalles de las facturas.

    Funciones disponibles:

    list: 
        Retorna una lista de todos los detalles de facturas disponibles.

    create: 
        Crea un nuevo detalle de factura con la información proporcionada.
        
        Parámetros:
            factura (int): ID de la factura asociada.
            producto (int): ID del producto.
            cantidad (int): Cantidad del producto en la factura.
        
        Respuestas:
            dict: Detalle de la factura creado.

    retrieve: 
        Obtiene los detalles de un detalle de factura basado en su ID.
        
        Parámetros:
            id (int): ID del detalle de factura.
        
        Respuestas:
            dict: Detalle de la factura solicitado.

    update: 
        Actualiza un detalle de factura existente.
        
        Parámetros:
            id (int): ID del detalle de factura a actualizar.
            factura (int): ID de la factura asociada.
            producto (int): ID del producto.
            cantidad (int): Cantidad del producto en la factura.
        
        Respuestas:
            dict: Detalle de la factura actualizado.

    partial_update: 
        Actualiza parcialmente un detalle de factura existente.
        
        Parámetros:
            id (int): ID del detalle de factura a actualizar.
            factura (int, opcional): ID de la factura asociada.
            producto (int, opcional): ID del producto.
            cantidad (int, opcional): Cantidad del producto en la factura.
        
        Respuestas:
            dict: Detalle de la factura actualizado.

    delete: 
        Elimina un detalle de factura existente.
        
        Parámetros:
            id (int): ID del detalle de factura que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = DetalleFacturaSerializer
    queryset = DetalleFactura.objects.all()


class ReservaViewSet(ModelViewSet):
    """
    Detalles de la API para las reservas.

    Funciones disponibles:

    list: 
        Retorna una lista de todas las reservas disponibles.

    create: 
        Crea una nueva reserva con la información proporcionada.
        
        Parámetros:
            mesa (int): ID de la mesa asociada.
            cliente (int): ID del cliente.
            fecha (datetime): Fecha de la reserva.
        
        Respuestas:
            dict: Reserva creada.

    retrieve: 
        Obtiene los detalles de una reserva basada en su ID.
        
        Parámetros:
            id (int): ID de la reserva.
        
        Respuestas:
            dict: Detalle de la reserva solicitada.

    update: 
        Actualiza una reserva existente.
        
        Parámetros:
            id (int): ID de la reserva a actualizar.
            mesa (int): ID de la mesa asociada.
            cliente (int): ID del cliente.
            fecha (datetime): Fecha de la reserva.
        
        Respuestas:
            dict: Reserva actualizada.

    partial_update: 
        Actualiza parcialmente una reserva existente.
        
        Parámetros:
            id (int): ID de la reserva a actualizar.
            mesa (int, opcional): ID de la mesa asociada.
            cliente (int, opcional): ID del cliente.
            fecha (datetime, opcional): Fecha de la reserva.
        
        Respuestas:
            dict: Reserva actualizada.

    delete: 
        Elimina una reserva existente.
        
        Parámetros:
            id (int): ID de la reserva que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = ReservaSerializer
    queryset = Reserva.objects.all()


class EnvioViewSet(ModelViewSet):
    """
    Detalles de la API para los envíos.

    Funciones disponibles:

    list: 
        Retorna una lista de todos los envíos disponibles.

    create: 
        Crea un nuevo envío con la información proporcionada.
        
        Parámetros:
            pedido (int): ID del pedido asociado.
            direccion (str): Dirección de envío.
        
        Respuestas:
            dict: Envío creado.

    retrieve: 
        Obtiene los detalles de un envío basado en su ID.
        
        Parámetros:
            id (int): ID del envío.
        
        Respuestas:
            dict: Detalle del envío solicitado.

    update: 
        Actualiza un envío existente.
        
        Parámetros:
            id (int): ID del envío a actualizar.
            pedido (int): ID del pedido asociado.
            direccion (str): Dirección de envío.
        
        Respuestas:
            dict: Envío actualizado.

    partial_update: 
        Actualiza parcialmente un envío existente.
        
        Parámetros:
            id (int): ID del envío a actualizar.
            pedido (int, opcional): ID del pedido asociado.
            direccion (str, opcional): Dirección de envío.
        
        Respuestas:
            dict: Envío actualizado.

    delete: 
        Elimina un envío existente.
        
        Parámetros:
            id (int): ID del envío que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = EnvioSerializer
    queryset = Envio.objects.all()


class EmpleadoTurnoViewSet(ModelViewSet):
    """
    Detalles de la API para los empleados en turno.

    Funciones disponibles:

    list: 
        Retorna una lista de todos los empleados en turno disponibles.

    create: 
        Crea un nuevo empleado en turno con la información proporcionada.
        
        Parámetros:
            empleado (int): ID del empleado asociado.
            turno (str): Turno del empleado.
        
        Respuestas:
            dict: Empleado en turno creado.

    retrieve: 
        Obtiene los detalles de un empleado en turno basado en su ID.
        
        Parámetros:
            id (int): ID del empleado en turno.
        
        Respuestas:
            dict: Detalle del empleado en turno solicitado.

    update: 
        Actualiza un empleado en turno existente.
        
        Parámetros:
            id (int): ID del empleado en turno a actualizar.
            empleado (int): ID del empleado asociado.
            turno (str): Turno del empleado.
        
        Respuestas:
            dict: Empleado en turno actualizado.

    partial_update: 
        Actualiza parcialmente un empleado en turno existente.
        
        Parámetros:
            id (int): ID del empleado en turno a actualizar.
            empleado (int, opcional): ID del empleado asociado.
            turno (str, opcional): Turno del empleado.
        
        Respuestas:
            dict: Empleado en turno actualizado.

    delete: 
        Elimina un empleado en turno existente.
        
        Parámetros:
            id (int): ID del empleado en turno que se desea eliminar.
        
        Respuestas:
            dict: Confirmación de la eliminación.
    """
    serializer_class = EmpleadoTurnoSerializer
    queryset = EmpleadoTurno.objects.all()