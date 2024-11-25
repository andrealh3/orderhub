import React, { useEffect, useState } from 'react';
import { GenericForm } from '../../FormGeneric/GenericForm';
import { useProductos } from '../../../hooks/useProductos';
import { Card, Button, Form } from 'react-bootstrap';
import { usePedido } from '../../../hooks/usePedido';
import { useDetallePedido } from '../../../hooks/useDetallePedido';


export const AgregarPedidoForm = ({ idMesa, openCloseModal, onReloadPedidos }) => {
  const { productos } = useProductos();
  const { agregarPedidoAMesa } = usePedido();
  const { agregarDetallePedido } = useDetallePedido();

  const [productosGuardados, setProductosGuardados] = useState([]);
  const [productosEnviar, setProductosEnviar] = useState([]);

  useEffect(() => {
    const productosPedidos = productosGuardados.map(({ nombre, imagen, ...resto }) => resto);
    productosPedidos.forEach(pedido => {
      pedido.producto = pedido.id;
      delete pedido.id;
    });
    setProductosEnviar(productosPedidos);
  }, [productosGuardados]);
  
  // Definimos los campos para el formulario
  const campos = [
    {
      name: "productos", 
      label: "Elige productos",  
      searchable: true, 
      type: "dropdown", 
      placeholder: 'Selecciona productos',
      options: productos.map(producto => ({ 
        value: producto.id, 
        label: producto.nombre, 
        imagen: producto.imagen
      })),
    },
  ];

  // Manejador para productos seleccionados
  const handleProductosSeleccionados = (_, nuevoProducto) => {
    if (nuevoProducto) {
      console.log(nuevoProducto)
      const productoExistente = productosGuardados.find(item => item.id === nuevoProducto.value);
      console.log(productosGuardados)
      if (productoExistente) {
        // Si ya está en la lista, solo aumentamos la cantidad
        const productosActualizados = productosGuardados.map(item =>
          item.id === nuevoProducto.value
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
        console.log(productosActualizados)
        setProductosGuardados(productosActualizados);
      } else {
        // Si no está en la lista, lo agregamos con una cantidad inicial de 1
        const nuevoProductoConCantidad = { 
          id: nuevoProducto.value,
          nombre: nuevoProducto.label, 
          imagen: nuevoProducto.imagen,
          cantidad: 1,
        };
        console.log(nuevoProductoConCantidad)
        setProductosGuardados(prevState => [...prevState, nuevoProductoConCantidad]);
      }
    }
  };

  // Actualizar la cantidad de un producto
  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) return;
    const productosActualizados = productosGuardados.map(item =>
      item.id === id
        ? { ...item, cantidad }
        : item
    );
    setProductosGuardados(productosActualizados);
  };

  // Eliminar un producto de la lista de seleccionados
  const eliminarProducto = (id) => {
    const productosActualizados = productosGuardados.filter(item => item.id !== id);
    setProductosGuardados(productosActualizados);
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      const idPedido = await agregarPedidoAMesa(idMesa);
      const agregarProductoADetalle = async (producto) => {
        producto.pedido = idPedido.id;
        await agregarDetallePedido(producto);
      };
      await Promise.all(productosEnviar.map(producto => agregarProductoADetalle(producto)));
      openCloseModal();
      onReloadPedidos();
    } catch (error) {
      
    } finally {}
  };

  return (
    <>
      <div>
        {productos.length === 0 ? (
          <p>No hay productos disponibles para agregar.</p>
        ) : (
          <GenericForm
            campos={campos}
            onSubmit={handleSubmit}
            infoBoton="Añadir productos a la mesa"
            initialValues={{ productos: [] }}
            onChange={handleProductosSeleccionados}
            disabled={productosGuardados.length === 0}
            nombreValoresFormularios="detalles_pedidos"
          />
        )}
      </div>
      {productosGuardados.length > 0 ? (
        <div>
          <strong>Productos seleccionados:</strong>
          { productosGuardados.map((producto) => (
            <Card key={producto.id}>
              <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} style={{ objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>Cantidad: 
                  <Form.Control 
                    type="number" 
                    value={producto.cantidad || '' }
                    onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value))}
                    min="1"
                    style={{ width: '80px' }}
                  />
                </Card.Text>
                <Button 
                  variant="danger" 
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No hay productos seleccionados.</p>
      )}
    </>
  );
};