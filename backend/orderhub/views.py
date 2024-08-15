from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import *
from .serializers import *
from rest_framework.decorators import action
from rest_framework import status


class UserApiViewSet(ModelViewSet):
    # permission_classes = [IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        # Encriptar la contraseña antes de crear el usuario
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        password = request.data.get('password')
        if password:
            request.data['password'] = make_password(password)
        else:
            request.data['password'] = self.get_object().password
        return super().partial_update(request, *args, **kwargs)

    @action(detail=False, methods=['get'], url_path='username')
    def retrieve_by_username(self, request):
        username = request.query_params.get('username')
        if username:
            try:
                user = User.objects.get(username=username)
                serializer = self.get_serializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail': 'Username parameter is required'}, status=status.HTTP_400_BAD_REQUEST) 

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Serializar el usuario autenticado y devolver su información
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class MesaViewSet(ModelViewSet):
    serializer_class = MesaSerializer
    queryset = Mesa.objects.all().order_by('numero')

class CategoriaViewSet(ModelViewSet):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()

class ProductoViewSet(ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

class PedidoViewSet(ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()

class DetallePedidoViewSet(ModelViewSet):
    serializer_class = DetallePedidoSerializer
    queryset = DetallePedido.objects.all()

class PagoViewSet(ModelViewSet):
    serializer_class = PagoSerializer
    queryset = Pago.objects.all()

class FacturaViewSet(ModelViewSet):
    serializer_class = FacturaSerializer
    queryset = Factura.objects.all()

class DetalleFacturaViewSet(ModelViewSet):
    serializer_class = DetalleFacturaSerializer
    queryset = DetalleFactura.objects.all()

class ReservaViewSet(ModelViewSet):
    serializer_class = ReservaSerializer
    queryset = Reserva.objects.all()

class EnvioViewSet(ModelViewSet):
    serializer_class = EnvioSerializer
    queryset = Envio.objects.all()

class EmpleadoTurnoViewSet(ModelViewSet):
    serializer_class = EmpleadoTurnoSerializer
    queryset = EmpleadoTurno.objects.all()