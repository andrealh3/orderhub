import { Button, Table } from "react-bootstrap";
import { BsPencil, BsX } from 'react-icons/bs';

export const ListarMesas = ({ mesa, actualizarMesa, eliminarMesa }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Numero de mesa</th>
          <th>Capacidad</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(mesa) && mesa.length > 0 ? (
          mesa.sort((a, b) => a.id - b.id).map((table) => (
            <tr key={table.id}>
              <td>{table.numero}</td>
              <td>{table.capacidad}</td>
              <td>{table.estado}</td>
              <Editar 
                mesa={table} 
                actualizarMesa={actualizarMesa} 
                eliminarMesa={eliminarMesa} 
              />
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No hay mesas</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const Editar = ({ mesa, actualizarMesa, eliminarMesa }) => {
  return (
    <td>
      <Button variant="outline-primary" onClick={() => actualizarMesa(mesa)} className="me-2">
        <BsPencil />
      </Button>
      <Button variant="outline-danger" onClick={() => eliminarMesa(mesa)}>
        <BsX />
      </Button>
    </td>
  );
};
