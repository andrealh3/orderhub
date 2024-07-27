from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    token = models.UUIDField(editable=False, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Mesa(models.Model):
    numero = models.IntegerField(unique=True)
    capacidad = models.IntegerField()
    estado = models.CharField(max_length=20, choices=[('libre', 'Libmre'), ('ocupada', 'Ocupada'), ('reservada', 'Reservada')])

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='categorias', blank=True, null=True)

class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='productos', blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    activo = models.BooleanField(default=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)

EstadoPedidoEnum = (
    ("PENDIENTE", "Pendiente"),
    ("EN_PROCESO", "En proceso"),
    ("COMPLETADO", "Completado")
)

class Pedido(models.Model):
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pedidos_cliente")
    empleado = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pedidos_empleado")
    mesa = models.ForeignKey(Mesa, on_delete=models.SET_NULL, null=True, blank=True)
    fecha = models.DateField()
    hora = models.TimeField()
    estado = models.CharField(max_length=20, choices=EstadoPedidoEnum)
    en_linea = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)
    cerrado = models.BooleanField(default=False)

class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='detalles')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()

EstadoPagoEnum = (
    ("PENDIENTE", "Pendiente"),
    ("PAGADO", "Pagado")
)

TipoPagoEnum = (
    ("TARJETA", "Tarjeta"),
    ("EFECTIVO", "Efectivo")
)

class Pago(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='pagos')
    total_pago = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_pago = models.CharField(max_length=20, choices=TipoPagoEnum)
    estado_pago = models.CharField(max_length=20, choices=EstadoPagoEnum)
    creado_en = models.DateTimeField(auto_now_add=True)

class Factura(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='facturas')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('pagada', 'Pagada')])

class DetalleFactura(models.Model):
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE, related_name='detalles_factura')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

EstadoReservaEnum = (
    ("CONFIRMADA", "Confirmada"),
    ("PENDIENTE", "Pendiente"),
    ("CANCELADA", "Cancelada")
)

class Reserva(models.Model):
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reserva_cliente")
    fecha = models.DateField()
    hora = models.TimeField()
    numero_personas = models.IntegerField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=EstadoReservaEnum)

EstadoEnvioEnum = (
    ("PENDIENTE", "Pendiente"),
    ("EN_TRANSITO", "En tránsito"),
    ("ENTREGADO", "Entregado")
)

class Envio(models.Model):
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='envio', null=True, blank=True)
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=20)
    estado_envio = models.CharField(max_length=20, choices=EstadoEnvioEnum)
    fecha_entrega = models.DateTimeField(blank=True, null=True)

class EmpleadoTurno(models.Model):
    empleado = models.ForeignKey(User, on_delete=models.CASCADE, related_name='turnos')
    fecha = models.DateField()
    hora_entrada = models.TimeField()
    hora_salida = models.TimeField()
