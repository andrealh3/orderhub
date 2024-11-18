import { Badge, Card } from 'react-bootstrap';
import { IcTable } from "../../Iconos/IcTable";
import { useEffect, useState } from 'react';
import { ESTADO_PEDIDO } from '../../../utils/constants';
import { usePedido } from '../../../hooks/usePedido';

export const ListarMesaAdmin = ({ mesa, reload }) => {
  const { loading, error, pedidos = [], obtenerPedidosPorMesa } = usePedido(); // Valor predeterminado como []
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  useEffect(() => {
    const obtenerPedidosPendientesOEnProceso = async () => {
      await obtenerPedidosPorMesa(mesa.id, [ESTADO_PEDIDO.PENDIENTE, ESTADO_PEDIDO.EN_PROCESO]);
    };
    
    obtenerPedidosPendientesOEnProceso();
  }, [mesa.id, reload]);

  useEffect(() => {
    if (pedidos && Array.isArray(pedidos)) {
      const filtrados = pedidos.filter(
        (pedido) => pedido.estado === ESTADO_PEDIDO.PENDIENTE || pedido.estado === ESTADO_PEDIDO.EN_PROCESO
      );
      setPedidosFiltrados(filtrados);
    }
  }, [pedidos]);

  return (
    <Card className="mb-3 align-items-center justify-content-center position-relative" style={{ width: '18rem', border: 'none' }}>
      <Card.Body className="text-center">
        {error && <p>Error: {error}</p>}
        {pedidosFiltrados.length > 0 && !loading && (
          <Badge
            pill
            bg="warning"
            text="dark"
            className="position-absolute top-0 start-50 translate-middle-x"
            style={{ transform: 'translateY(-50%)' }}
          >
            {pedidosFiltrados.length}
          </Badge>
        )}
        <IcTable width="100" height="100" />
        <Card.Title>Mesa {mesa.numero}</Card.Title>
      </Card.Body>
    </Card>
  );
};