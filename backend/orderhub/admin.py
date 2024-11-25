from django.contrib import admin
from .models import *

# Inline para mostrar los detalles del pedido en la administración de Pedido
class DetallePedidoInline(admin.TabularInline):
    model = DetallePedido
    can_delete = False  # Deshabilita la opción de eliminar detalles de pedido desde el inline
    extra = 0  # No muestra líneas vacías adicionales
    show_change_link = True  # Muestra un enlace para editar los detalles de pedido


# Inline para mostrar los pedidos en la administración de la mesa
class PedidoInline(admin.TabularInline):
    model = Pedido
    extra = 0
    can_delete = False  # Deshabilita la opción de eliminar pedidos desde el inline
    show_change_link = True  # Mostrar un enlace para editar los pedidos

class MesaAdmin(admin.ModelAdmin):
    list_display = ('numero', 'capacidad', 'estado')
    search_fields = ('numero',)
    list_filter = ('estado',)
    ordering = ('numero',)
    
    # Incluir el inline de pedidos en la vista de la mesa
    inlines = [PedidoInline]

admin.site.register(Mesa, MesaAdmin)

# Otros modelos y administradores
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre',)

admin.site.register(Categoria, CategoriaAdmin)

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'activo', 'categoria')
    search_fields = ('nombre', 'categoria__nombre')
    list_filter = ('activo', 'categoria')
    ordering = ('nombre',)

admin.site.register(Producto, ProductoAdmin)

class PedidoAdmin(admin.ModelAdmin):
    list_display = ('mesa', 'estado', 'fecha', 'hora')
    search_fields = ('mesa', 'estado')
    list_filter = ('estado', 'en_linea')
    ordering = ('-fecha', '-hora')
    inlines = [DetallePedidoInline]


admin.site.register(Pedido, PedidoAdmin)

class DetallePedidoAdmin(admin.ModelAdmin):
    list_display = ('pedido', 'producto', 'cantidad')
    search_fields = ('pedido__cliente__email', 'producto__nombre')

admin.site.register(DetallePedido, DetallePedidoAdmin)

class PagoAdmin(admin.ModelAdmin):
    list_display = ('mesa', 'total_pago', 'tipo_pago', 'estado_pago', 'creado_en')
    search_fields = ('pedido__cliente__email', 'estado_pago')
    list_filter = ('estado_pago', 'tipo_pago')

admin.site.register(Pago, PagoAdmin)

class FacturaAdmin(admin.ModelAdmin):
    list_display = ('pedido', 'total', 'estado')
    search_fields = ('pedido__cliente__email', 'estado')

admin.site.register(Factura, FacturaAdmin)

class DetalleFacturaAdmin(admin.ModelAdmin):
    list_display = ('factura', 'producto', 'cantidad', 'precio_unitario', 'subtotal')
    search_fields = ('factura__pedido__cliente__email', 'producto__nombre')

admin.site.register(DetalleFactura, DetalleFacturaAdmin)

class ReservaAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'fecha', 'hora', 'numero_personas', 'estado')
    search_fields = ('cliente__email', 'estado')

admin.site.register(Reserva, ReservaAdmin)

class EnvioAdmin(admin.ModelAdmin):
    list_display = ('pedido', 'direccion', 'ciudad', 'estado_envio')
    search_fields = ('pedido__cliente__email', 'direccion', 'ciudad')

admin.site.register(Envio, EnvioAdmin)

class EmpleadoTurnoAdmin(admin.ModelAdmin):
    list_display = ('empleado', 'fecha', 'hora_entrada', 'hora_salida')
    search_fields = ('empleado__email',)
    list_filter = ('fecha',)

admin.site.register(EmpleadoTurno, EmpleadoTurnoAdmin)

