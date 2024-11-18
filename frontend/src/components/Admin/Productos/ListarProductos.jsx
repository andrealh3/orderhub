import { Button, Card, Col, Row } from "react-bootstrap";
import { BsCheck, BsPencil, BsX } from 'react-icons/bs';

export const ListarProductos = ({ productos, actualizarProducto, eliminarProducto }) => {
  return (
    <Row className="g-3 justify-content-center">
      {Array.isArray(productos) && productos.length > 0 ? (
        productos.sort((a, b) => a.id - b.id).map((prod) => (
          <Col xs={12} sm={6} md={4} key={prod.id}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Img 
                  variant="top" 
                  src={prod.imagen ? prod.imagen : "placeholder-image-url"} 
                  alt={prod.nombre} 
                  style={{ width: '50%', height: 'auto'}}
                />
                <Card.Title>{prod.nombre}</Card.Title>
                <Card.Text>
                  <strong>Descripción:</strong> {prod.descripcion}
                  <br />
                  <strong>Categoría:</strong> {prod.categoria_data.nombre}
                  <br />
                  <strong>Precio:</strong> {prod.precio} €
                  <br />
                  <strong>Activo:</strong> {prod.activo ? <BsCheck color="green" /> : <BsX color="red" />}
                </Card.Text>
                <Editar 
                  producto={prod} 
                  actualizarProducto={actualizarProducto} 
                  eliminarProducto={eliminarProducto} 
                />
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <div className="text-center">
            <h4>No hay productos disponibles</h4>
          </div>
        </Col>
      )}
    </Row>
  );
};

const Editar = ({ producto, actualizarProducto, eliminarProducto }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Button variant="outline-primary" onClick={() => actualizarProducto(producto)} className="me-2">
        <BsPencil />
      </Button>
      <Button variant="outline-danger" onClick={() => eliminarProducto(producto.id)}>
        <BsX />
      </Button>
    </div>
  );
};
