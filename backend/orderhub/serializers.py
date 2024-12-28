from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = '__all__'

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)  # Quita el campo de contraseña si no se proporciona
        instance = super().update(instance, validated_data)
        
        if password:
            instance.set_password(password)  # Establece la nueva contraseña si se proporciona
            instance.save()

        return instance

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    categoria_data = CategoriaSerializer(source='categoria', read_only=True)
    class Meta:
        model = Producto
        fields = '__all__'

class DetallePedidoSerializer(serializers.ModelSerializer):
    producto_data = ProductoSerializer(source='producto', read_only=True)
    class Meta:
        model = DetallePedido
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    detalles_pedido_data = DetallePedidoSerializer(source='detalle_pedido', many=True, read_only=True)
    class Meta:
        model = Pedido
        fields = '__all__'

class MesaSerializer(serializers.ModelSerializer):
    pedidos_data = PedidoSerializer(source='pedido', many=True, read_only=True)
    class Meta:
        model = Mesa
        fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
    mesa_data = MesaSerializer(source='mesa', allow_null=True, many=True, read_only=True)
    class Meta:
        model = Pago
        fields = '__all__'
    
class DetalleFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleFactura
        fields = '__all__'

class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'
    
class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'

class EnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envio
        fields = '__all__'

class EmpleadoTurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpleadoTurno
        fields = '__all__'