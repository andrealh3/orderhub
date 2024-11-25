import { Button, Card, Col, Row } from "react-bootstrap";
import { BsPencil, BsX } from 'react-icons/bs';

export const ListarMesas = ({ mesas, actualizarMesa, eliminarMesa }) => {
  return (
    <Row className="g-3 justify-content-center">
      {Array.isArray(mesas) && mesas.length > 0 ? (
        mesas.sort((a, b) => a.id - b.id).map((mesa) => (
          <Col xs={12} sm={6} md={4} key={mesa.id}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>Mesa {mesa.numero}</Card.Title>
                <Card.Text>
                  <strong>Capacidad:</strong> {mesa.capacidad} personas
                  <br />
                  <strong>Estado:</strong> {mesa.estado}
                </Card.Text>
                <Editar 
                  mesa={mesa} 
                  actualizarMesa={actualizarMesa} 
                  eliminarMesa={eliminarMesa} 
                />
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <div className="text-center">
            <h4>No hay mesas disponibles</h4>
          </div>
        </Col>
      )}
    </Row>
  );
};

const Editar = ({ mesa, actualizarMesa, eliminarMesa }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Button variant="outline-primary" onClick={() => actualizarMesa(mesa)} className="me-2">
        <BsPencil />
      </Button>
      <Button variant="outline-danger" onClick={() => eliminarMesa(mesa.id)}>
        <BsX />
      </Button>
    </div>
  );
};