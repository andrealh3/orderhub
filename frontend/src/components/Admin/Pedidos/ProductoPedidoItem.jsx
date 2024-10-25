import { Card, Col, Row } from "react-bootstrap"

export const ProductoPedidoItem = ({ producto }) => {
  return (
    <div>
      <Card className="mb-4" style={{ height: '100%' }}>
        <Row className="g-0">
          <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
            <Card.Img
              src={producto.producto_data.imagen}
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                objectFit: 'contain',
              }}
            />
          </Col>
          <Col xs={12} md={8} className="align-content-center text-center">
            <Card.Body>
              <Card.Title>{producto.producto_data.nombre}</Card.Title>
              <Card.Text>
                <strong>Descripción:</strong> {producto.producto_data.descripcion} <br />
                <strong>Cantidad:</strong> {producto.cantidad}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
