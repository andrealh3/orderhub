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
        id: producto.id, 
        nombre: producto.nombre, 
        imagen: producto.imagen
      })),
    },
  ];

  // Manejador para productos seleccionados
  const handleProductosSeleccionados = (nuevoProducto) => {
    const productoExistente = productosGuardados.find(item => item.id === nuevoProducto[0].id);
    if (productoExistente) {
      // Si ya está en la lista, solo aumentamos la cantidad
      const productosActualizados = productosGuardados.map(item =>
        item.id === nuevoProducto[0].id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setProductosGuardados(productosActualizados);
    } else {
      // Si no está en la lista, lo agregamos con una cantidad inicial de 1
      const nuevoProductoConCantidad = { 
        id: nuevoProducto[0].id, 
        nombre: nuevoProducto[0].nombre, 
        imagen: nuevoProducto[0].imagen,
        cantidad: 1 
      };
      setProductosGuardados(prevState => [...prevState, nuevoProductoConCantidad]);
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
          />
        )}
      </div>
      <div>
        {productosGuardados.length > 0 ? (
          <div>
            <strong>Productos seleccionados:</strong>
            <div>
              {productosGuardados.map((producto) => (
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
          </div>
        ) : (
          <p>No hay productos seleccionados.</p>
        )}
      </div>
    </>
  );
};





// import React, { useState } from 'react';
// import { GenericForm } from '../../GenericForm';
// import { useProductos } from '../../../hooks/useProductos';
// import { Card, Button, Form } from 'react-bootstrap';

// export const AgregarPedidoForm = ({ id, openCloseModal }) => {
//   const { productos } = useProductos();

//   // Estado para manejar los productos seleccionados
//   const [productosSeleccionados, setProductosSeleccionados] = useState([]);
//   console.log(productosSeleccionados);

//   // Campos que se pasan al formulario GenericForm
//   const campos = [
//     {
//       name: "productos", 
//       label: "Elige productos",  
//       searchable: true, 
//       type: "select", 
//       placeholder: 'Selecciona productos',
//       options: productos.map(producto => ({ value: producto.id, label: producto.nombre })),
//     },
//   ];

//   // Función para manejar la selección de productos (en cada cambio)
//   const handleProductosSeleccionados = (productosSeleccionados) => {
//     setProductosSeleccionados(productosSeleccionados);
//   };

//   // Función para agregar un producto con cantidad
//   const agregarProducto = (producto) => {
//     const productoExistente = productosSeleccionados.find(item => item.id === producto.id);
//     if (productoExistente) {
//       // Si ya existe, solo incrementamos la cantidad
//       const productosActualizados = productosSeleccionados.map(item =>
//         item.id === producto.id
//           ? { ...item, cantidad: item.cantidad + 1 }
//           : item
//       );
//       setProductosSeleccionados(productosActualizados);
//     } else {
//       // Si no existe, lo agregamos con cantidad 1
//       const nuevoProducto = { 
//         id: producto.id, 
//         nombre: producto.nombre, 
//         cantidad: 1 
//       };
//       setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);
//     }
//   };

//   // Función para actualizar la cantidad de un producto seleccionado
//   const actualizarCantidad = (id, cantidad) => {
//     if (cantidad <= 0) return; // No permitir cantidad menor a 1
//     const productosActualizados = productosSeleccionados.map(item =>
//       item.id === id
//         ? { ...item, cantidad }
//         : item
//     );
//     setProductosSeleccionados(productosActualizados);
//   };

//   return (
//     <>
//       <div>
//         {/* Mostrar los productos seleccionados como Cards */}
//         {productosSeleccionados.length > 0 ? (
//           <div>
//             <strong>Productos seleccionados:</strong>
//             <div>
//               {productosSeleccionados.map((producto) => (
//                 <Card key={producto.id}>
//                   <Card.Body>
//                     <Card.Title>{producto.nombre}</Card.Title>
//                     <Card.Text>Cantidad: 
//                       <Form.Control 
//                         type="number" 
//                         value={producto.cantidad || '' }
//                         onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value))}
//                         min="1"
//                         style={{ width: '80px' }}
//                       />
//                     </Card.Text>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => setProductosSeleccionados(productosSeleccionados.filter(item => item.id !== producto.id))}
//                     >
//                       Eliminar
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>No hay productos seleccionados.</p>
//         )}
        
//         {/* Formulario para agregar productos */}
//         <GenericForm
//           campos={campos}
//           onSubmit={(valoresFormulario) => {
//             console.log('Formulario enviado con los valores:', valoresFormulario);
//           }}
//           infoBoton="Añadir productos a la mesa"
//           initialValues={{ productos: [] }} // Valor inicial vacío
//           nombreValoresFormularios="pedidoForm"
//           onChange={handleProductosSeleccionados} // Pasar la función para manejar los productos seleccionados
//         />
//       </div>
//     </>
//   );
// };
