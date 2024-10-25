import { Badge, Card } from 'react-bootstrap';
import { IcTable } from "../../Iconos/IcTable";
import { useEffect } from 'react';
import { ESTADO_PEDIDO } from '../../../utils/constants';
import { usePedido } from '../../../hooks/usePedido';

export const ListarMesaAdmin = ({ mesa, reload }) => {
  const { loading, error, data: pedidos, obtenerPedidosPorMesa } = usePedido();

  useEffect(() => {
    obtenerPedidosPorMesa(mesa.id, ESTADO_PEDIDO.PENDIENTE);
  }, [mesa.id, obtenerPedidosPorMesa, reload]);

  return (
    <Card className="mb-3 d-flex align-items-center justify-content-center position-relative" style={{ width: '18rem', border: 'none' }}>
      <Card.Body className="text-center">
        {error && <p>Error: {error}</p>}
        {pedidos?.length > 0 && !loading && (
          <Badge
            pill
            bg="warning"
            text="dark"
            className="position-absolute top-0 start-50 translate-middle-x"
            style={{ transform: 'translateY(-50%)' }} // Posicionar en la parte superior
          >
            {pedidos.length}
          </Badge>
        )}
        <IcTable width="100" height="100" />
        <Card.Title>Mesa {mesa.numero}</Card.Title>
      </Card.Body>
    </Card>
  );
};