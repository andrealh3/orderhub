import { PedidoItem } from "./PedidoItem"

export const ListaPedidos = ({ pedidos, onReloadPedidos }) => {
  console.log(pedidos)
  
  return (
    <div>
      <h4>Pedidos</h4>
      {Array.isArray(pedidos) ? (
        // Si pedidos es un array, recorrer y renderizar PedidoItem para cada elemento
        pedidos.map((pedido, num) => (
          <PedidoItem
            key={pedido.id}
            pedido={pedido}
            numeroPedido={num + 1}
            onReloadPedidos={onReloadPedidos}
          />
        ))
      ) : pedidos ? (
        // Si pedidos es un objeto, renderizar directamente un PedidoItem
        <PedidoItem
          key={pedidos.id}
          pedido={pedidos}
          numeroPedido={1}
          onReloadPedidos={onReloadPedidos}
        />
      ) : (
        // Si no hay pedidos, mostrar mensaje
        <p>No hay pedidos disponibles.</p>
      )}
    </div>
  );
};