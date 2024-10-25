import { ListaProductos } from "./ListaProductos"

export const PedidoItem = ({ pedido, numeroPedido }) => {
  console.log(pedido)
  return (
    <div>
      <h5>Pedido {numeroPedido}</h5>
      <ListaProductos productos={pedido.detalles_pedido_data}/>
    </div>
  )
}
