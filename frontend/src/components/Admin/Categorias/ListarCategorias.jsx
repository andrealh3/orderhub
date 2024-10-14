import { Button, Table } from "react-bootstrap";
import { BsPencil, BsX } from 'react-icons/bs';

export const ListarCategorias = ({ categoria, actualizarCategoria, eliminarCategoria }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Categoria</th>
          <th>Descripcion</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(categoria) && categoria.length > 0 ? (
          categoria.sort((a, b) => a.id - b.id).map((cat) => (
            <tr key={cat.id}>
              <td>
                {cat.imagen ? (
                  <img 
                    src={`${cat.imagen}`} 
                    alt={cat.nombre} 
                    style={{ width: '100px', height: 'auto' }} 
                  />
                ) : (
                  <span>No hay imagen</span>
                )}
              </td>
              <td>{cat.nombre}</td>
              <td>{cat.descripcion}</td>
              <Editar 
                categoria={cat} 
                actualizarCategoria={actualizarCategoria} 
                eliminarCategoria={eliminarCategoria} 
              />
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No hay categorias</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const Editar = ({ categoria, actualizarCategoria, eliminarCategoria }) => {
  return (
    <td>
      <Button variant="outline-primary" onClick={() => actualizarCategoria(categoria)} className="me-2">
        <BsPencil />
      </Button>
      <Button variant="outline-danger" onClick={() => eliminarCategoria(categoria)}>
        <BsX />
      </Button>
    </td>
  );
};
