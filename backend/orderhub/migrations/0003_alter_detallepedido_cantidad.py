# Generated by Django 4.2.7 on 2024-10-23 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orderhub', '0002_categoria_mesa_reserva_producto_pedido_pago_factura_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detallepedido',
            name='cantidad',
            field=models.IntegerField(default=1),
        ),
    ]
