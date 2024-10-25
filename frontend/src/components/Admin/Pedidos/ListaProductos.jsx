import React from 'react'
import { ProductoPedidoItem } from './ProductoPedidoItem'
import { Col, Row } from 'react-bootstrap'

export const ListaProductos = ({ productos }) => {
  console.log(productos)
  return (
    <div>
      <Row>
        {productos && productos.map((producto) => (
          <Col key={producto.id} lg={6} className="justify-content-center align-content-center">
            <ProductoPedidoItem key={producto.id} producto={producto} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
