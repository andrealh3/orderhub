import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import moment from 'moment';
import { Card, Badge, Button } from 'react-bootstrap';
import { ListaProductos } from "./ListaProductos";
import { ESTADO_PEDIDO } from '../../../utils/constants';
import { usePedido } from '../../../hooks/usePedido';

export const PedidoItem = ({ pedido, numeroPedido, onReloadPedidos }) => {
  const fechaHora = moment(`${pedido.fecha} ${pedido.hora}`);
  const { verificarPedidoEntregado, verificarPedidoEnProceso } = usePedido();

  const onVerificarPedidoEntregado = async () =>  {
    await verificarPedidoEntregado(pedido.id);
    onReloadPedidos();
  }

  const onVerificarPedidoEnProceso = async () =>  {
    await verificarPedidoEnProceso(pedido.id);
    onReloadPedidos();
  }

  return (
    <>
      {(pedido.estado === ESTADO_PEDIDO.EN_PROCESO ) && (
        <Button onClick={onVerificarPedidoEntregado}>
          Marcar como entregado
        </Button>
      )}
      {pedido.estado === ESTADO_PEDIDO.PENDIENTE && (
        <Button onClick={onVerificarPedidoEnProceso}>
          Marcar como en proceso
        </Button>
      )}
      {pedido.estado === ESTADO_PEDIDO.COMPLETADO && (
        <span>COMPLETADO</span>
      )}
      <Card className="p-4 m-3 position-relative">
        <Badge
          bg="light"
          text="dark"
          className="position-absolute start-100 translate-middle-x"
          style={{ 
            top: '-0.8rem',
            fontSize: '0.9rem',
          }}
        >
          {format(fechaHora.toDate(), 'HH:mm', { locale: es })} - hace {formatDistanceToNow(fechaHora.toDate(), { locale: es })}
        </Badge>
        <Card.Body className="text-center">
          <ListaProductos productos={pedido.detalles_pedido_data} />
        </Card.Body>
      </Card>
    </>
  );
};