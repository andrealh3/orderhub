from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
import os

class CustomUserManager(BaseUserManager):
    """
    Manager personalizado para el modelo User que utiliza el email en lugar del nombre de usuario.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Crea y devuelve un usuario con un email y una contraseña.
        
        Args:
            email (str): Dirección de correo electrónico del usuario.
            password (str, opcional): Contraseña del usuario. Default es None.
            extra_fields (dict): Campos adicionales para el usuario.

        Raises:
            ValueError: Si no se proporciona el email.

        Returns:
            User: El objeto de usuario creado.
        """
        if not email:
            raise ValueError('El campo Email debe estar establecido')
        email = self.normalize_email(email)
        
        if 'role' not in extra_fields:
            extra_fields['role'] = 'cliente'  # Asigna rol 'cliente' por defecto

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Crea y devuelve un superusuario con un email y una contraseña.
        
        Args:
            email (str): Dirección de correo del superusuario.
            password (str, opcional): Contraseña del superusuario. Default es None.
            extra_fields (dict): Campos adicionales.

        Raises:
            ValueError: Si is_staff o is_superuser no están configurados como True.

        Returns:
            User: El superusuario creado.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        extra_fields.setdefault('role', 'admin')  # Asigna el rol 'admin' por defecto
        
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    """
    Modelo personalizado de usuario que utiliza el email en lugar del nombre de usuario.

    Attributes:
        email (EmailField): Dirección de correo única del usuario.
        role (CharField): Rol del usuario ('cliente' o 'admin').
    """
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, default='cliente')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


class Mesa(models.Model):
    """
    Modelo que representa una mesa en el restaurante.

    Attributes:
        numero (IntegerField): Número único de la mesa.
        capacidad (IntegerField): Capacidad de personas que puede albergar la mesa.
        estado (CharField): Estado actual de la mesa (libre, ocupada, reservada).
    """
    numero = models.IntegerField(unique=True)
    capacidad = models.IntegerField()
    estado = models.CharField(max_length=20, choices=[('libre', 'Libre'), ('ocupada', 'Ocupada'), ('reservada', 'Reservada')])

class Categoria(models.Model):
    """
    Modelo que representa una categoría de productos en el menú.

    Attributes:
        nombre (CharField): Nombre de la categoría.
        descripcion (TextField): Descripción de la categoría.
        imagen (ImageField): Imagen representativa de la categoría.
    """
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='categorias', blank=True, null=True)

    def save(self, *args, **kwargs):
        # Verificar si la instancia ya existe para eliminar la imagen anterior
        if self.pk:  # Si ya existe, es una actualización
            old_instance = Categoria.objects.get(pk=self.pk)
            if old_instance.imagen and old_instance.imagen != self.imagen:
                # Eliminar la imagen anterior si existe
                if os.path.isfile(old_instance.imagen.path):
                    os.remove(old_instance.imagen.path)
        
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Eliminar la imagen al eliminar la instancia
        if self.imagen:
            if os.path.isfile(self.imagen.path):
                os.remove(self.imagen.path)
        super().delete(*args, **kwargs)

class Producto(models.Model):
    """
    Modelo que representa un producto del menú.

    Attributes:
        nombre (CharField): Nombre del producto.
        descripcion (TextField): Descripción detallada del producto.
        imagen (ImageField): Imagen del producto.
        precio (DecimalField): Precio del producto.
        activo (BooleanField): Indica si el producto está activo.
        categoria (ForeignKey): Relación con la categoría a la que pertenece el producto.
    """
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='productos', blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    activo = models.BooleanField(default=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)

    def save(self, *args, **kwargs):
        # Verificar si la instancia ya existe para eliminar la imagen anterior
        if self.pk:  # Si ya existe, es una actualización
            old_instance = Producto.objects.get(pk=self.pk)
            if old_instance.imagen and old_instance.imagen != self.imagen:
                # Eliminar la imagen anterior si existe
                if os.path.isfile(old_instance.imagen.path):
                    os.remove(old_instance.imagen.path)
        
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Eliminar la imagen al eliminar la instancia
        if self.imagen:
            if os.path.isfile(self.imagen.path):
                os.remove(self.imagen.path)
        super().delete(*args, **kwargs)

EstadoPedidoEnum = (
    ("PENDIENTE", "Pendiente"),
    ("EN_PROCESO", "En proceso"),
    ("COMPLETADO", "Completado")
)

class Pedido(models.Model):
    """
    Modelo que representa un pedido realizado por un cliente.

    Attributes:
        cliente (ForeignKey): Cliente que realizó el pedido.
        empleado (ForeignKey): Empleado encargado del pedido.
        mesa (ForeignKey): Mesa asignada al pedido (si aplica).
        fecha (DateField): Fecha en la que se realizó el pedido.
        hora (TimeField): Hora en la que se realizó el pedido.
        estado (CharField): Estado actual del pedido (Pendiente, En proceso, Completado).
        en_linea (BooleanField): Indica si el pedido se realizó en línea.
        creado_en (DateTimeField): Fecha y hora en que se creó el pedido.
        cerrado (BooleanField): Indica si el pedido está cerrado.
    """
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pedidos_cliente", blank=True, null=True)
    empleado = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pedidos_empleado", blank=True, null=True)
    mesa = models.ForeignKey(Mesa, on_delete=models.SET_NULL, null=True, blank=True)
    fecha = models.DateField()
    hora = models.TimeField()
    estado = models.CharField(max_length=20, choices=EstadoPedidoEnum)
    en_linea = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)
    cerrado = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Verificar si la mesa está ocupada
        if self.mesa and self.mesa.estado == 'ocupada':
            # Buscar el último pedido activo de la misma mesa
            ultimo_pedido = Pedido.objects.filter(mesa=self.mesa, cerrado=False).last()
            if ultimo_pedido:
                # Asignar cliente y empleado del último pedido activo al nuevo pedido
                self.cliente = ultimo_pedido.cliente
                self.empleado = ultimo_pedido.empleado
        super().save(*args, **kwargs)

class DetallePedido(models.Model):
    """
    Modelo que representa el detalle de los productos solicitados en un pedido.

    Attributes:
        pedido (ForeignKey): Pedido al que pertenece el detalle.
        producto (ForeignKey): Producto incluido en el detalle.
        cantidad (IntegerField): Cantidad de producto solicitada.
    """
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='detalles')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)

EstadoPagoEnum = (
    ("PENDIENTE", "Pendiente"),
    ("PAGADO", "Pagado")
)

TipoPagoEnum = (
    ("TARJETA", "Tarjeta"),
    ("EFECTIVO", "Efectivo")
)

class Pago(models.Model):
    """
    Modelo que representa el pago realizado por un pedido.

    Attributes:
        pedido (ForeignKey): Pedido asociado al pago.
        total_pago (DecimalField): Monto total pagado.
        tipo_pago (CharField): Método de pago (Tarjeta, Efectivo).
        estado_pago (CharField): Estado del pago (Pendiente, Pagado).
        creado_en (DateTimeField): Fecha y hora en que se registró el pago.
    """
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='pagos')
    total_pago = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_pago = models.CharField(max_length=20, choices=TipoPagoEnum)
    estado_pago = models.CharField(max_length=20, choices=EstadoPagoEnum)
    creado_en = models.DateTimeField(auto_now_add=True)

class Factura(models.Model):
    """
    Modelo que representa una factura generada para un pedido.

    Attributes:
        pedido (ForeignKey): Pedido asociado a la factura.
        total (DecimalField): Total a pagar por la factura.
        estado (CharField): Estado de la factura (Pendiente, Pagada).
    """
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='facturas')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('pagada', 'Pagada')])

class DetalleFactura(models.Model):
    """
    Modelo que representa el detalle de una factura.

    Attributes:
        factura (ForeignKey): Factura a la que pertenece el detalle.
        producto (ForeignKey): Producto facturado.
        cantidad (IntegerField): Cantidad del producto facturado.
        precio_unitario (DecimalField): Precio unitario del producto.
        subtotal (DecimalField): Subtotal de este producto en la factura.
    """
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
    """
    Modelo que representa una reserva de mesa hecha por un cliente.

    Attributes:
        cliente (ForeignKey): Cliente que realiza la reserva.
        fecha (DateField): Fecha de la reserva.
        hora (TimeField): Hora de la reserva.
        numero_personas (IntegerField): Número de personas para la reserva.
        estado (CharField): Estado de la reserva (Confirmada, Pendiente, Cancelada).
    """
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
    """
    Modelo que representa el envío de un pedido realizado en línea.

    Attributes:
        pedido (OneToOneField): Pedido al que está asociado el envío.
        direccion (CharField): Dirección de entrega.
        ciudad (CharField): Ciudad de entrega.
        codigo_postal (CharField): Código postal de la dirección de entrega.
        estado_envio (CharField): Estado del envío (Pendiente, En tránsito, Entregado).
        fecha_entrega (DateTimeField): Fecha y hora de la entrega.
    """
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='envio', null=True, blank=True)
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=20)
    estado_envio = models.CharField(max_length=20, choices=EstadoEnvioEnum)
    fecha_entrega = models.DateTimeField(blank=True, null=True)

class EmpleadoTurno(models.Model):
    """
    Modelo que representa el turno de un empleado.

    Attributes:
        empleado (ForeignKey): Empleado que realiza el turno.
        fecha (DateField): Fecha del turno.
        hora_entrada (TimeField): Hora de entrada del empleado.
        hora_salida (TimeField): Hora de salida del empleado.
    """
    empleado = models.ForeignKey(User, on_delete=models.CASCADE, related_name='turnos')
    fecha = models.DateField()
    hora_entrada = models.TimeField()
    hora_salida = models.TimeField()
