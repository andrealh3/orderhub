import { Button, Card, Col, Row } from "react-bootstrap";
import { BsPencil, BsX } from 'react-icons/bs';

export const ListarCategorias = ({ categorias, actualizarCategoria, eliminarCategoria }) => {
  return (
    <Row className="g-3 justify-content-center">
      {Array.isArray(categorias) && categorias.length > 0 ? (
        categorias.sort((a, b) => a.id - b.id).map((categoria) => (
          <Col xs={12} sm={6} md={4} key={categoria.id}>
            <Card className="h-100">
              <Card.Body className="text-center">
                {categoria.imagen ? (
                  <Card.Img 
                    variant="top" 
                    src={`${categoria.imagen}`} 
                    alt={categoria.nombre} 
                    style={{ width: '50%', height: 'auto' }} 
                  />
                ) : (
                  <Card.Text className="text-muted">No hay imagen</Card.Text>
                )}
                <Card.Title>{categoria.nombre}</Card.Title>
                <Card.Text>{categoria.descripcion}</Card.Text>
                <Editar 
                  categoria={categoria} 
                  actualizarCategoria={actualizarCategoria} 
                  eliminarCategoria={eliminarCategoria} 
                />
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <div className="text-center">
            <h4>No hay categorías disponibles</h4>
          </div>
        </Col>
      )}
    </Row>
  );
};

const Editar = ({ categoria, actualizarCategoria, eliminarCategoria }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Button variant="outline-primary" onClick={() => actualizarCategoria(categoria)} className="me-2">
        <BsPencil />
      </Button>
      <Button variant="outline-danger" onClick={() => eliminarCategoria(categoria.id)}>
        <BsX />
      </Button>
    </div>
  );
};

