import { PedidoItem } from "./PedidoItem"

export const ListaPedidos = ({ pedidos }) => {
  return (
    <div>
      <h4>Pedidos</h4>
      {pedidos && pedidos.map((pedido, num) => (
        <PedidoItem key={pedido.id} pedido={pedido} numeroPedido={num+1} />
      ))}
    </div>
  )
}
