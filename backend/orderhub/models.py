from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Crea y devuelve un usuario con un email y una contraseña"""
        if not email:
            raise ValueError('El campo Email debe estar establecido')
        email = self.normalize_email(email)
        
        # Asigna el rol solo si no está ya en extra_fields
        if 'role' not in extra_fields:
            extra_fields['role'] = 'cliente'  # Asigna el rol 'clientes' por defecto
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Crea y devuelve un superusuario con un email y una contraseña"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        # Asegúrate de que el rol se establezca solo si no está presente
        extra_fields.setdefault('role', 'admin')  # Establece el rol 'admin' para superusuarios
        
        return self.create_user(email, password, **extra_fields)
    

class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, default='cliente')

    # Define el campo que se usará como nombre de usuario
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


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