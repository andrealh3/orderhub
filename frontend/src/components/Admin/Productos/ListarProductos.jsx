import { Button, Table } from "react-bootstrap";
import { BsCheck, BsPencil, BsX } from 'react-icons/bs';

export const ListarProductos = ({ producto, actualizarProducto, eliminarProducto }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Descripcion</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th>Activo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(producto) && producto.length > 0 ? (
          producto.sort((a, b) => a.id - b.id).map((prod) => (
            <tr key={prod.id}>
              <td>
                {prod.imagen ? (
                  <img 
                    src={`${prod.imagen}`} 
                    alt={prod.nombre} 
                    style={{ width: '100px', height: 'auto' }} 
                  />
                ) : (
                  <span>No hay imagen</span>
                )}
              </td>
              <td>{prod.nombre}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.categoria_data.nombre}</td>
              <td>{prod.precio}</td>
              <td>{prod.activo ? <BsCheck color="green" /> : <BsX color="red" />}</td>
              <Editar 
                categoria={prod} 
                actualizarProducto={actualizarProducto} 
                eliminarProducto={eliminarProducto} 
              />
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">No hay productos</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const Editar = ({ categoria, actualizarProducto, eliminarProducto }) => {
  return (
    <td>
      <Button variant="outline-primary" onClick={() => actualizarProducto(categoria)} className="me-2">
        <BsPencil />
      </Button>
      <Button variant="outline-danger" onClick={() => eliminarProducto(categoria)}>
        <BsX />
      </Button>
    </td>
  );
};
