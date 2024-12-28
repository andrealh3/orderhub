import { useState, useEffect } from "react";
import { Badge, Card } from "react-bootstrap";
import { IcTable } from "../../Iconos/IcTable";
import { useLocation } from "react-router-dom";

export const ListarMesaAdmin = ({ mesa }) => {
  const [pedidos, setPedidos] = useState(mesa.pedidos_data.filter(pedido => !pedido.cerrado && pedido.estado === 'COMPLETADO'));
  const [error, setError] = useState(null);
  const location = useLocation(); // Obtener la ubicación actual

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/pedidos/${mesa.id}/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "pedidos_update") {
        setPedidos(data.pedidos);
      }
    };

    socket.onerror = () => {
      setError("Hubo un problema con la conexión WebSocket."); // Maneja el error
    };

    return () => {
      socket.close(); // Cierra la conexión al cambiar la ubicación
    };
  }, [mesa.id, location.pathname]);

  return (
    <Card className="mb-3 align-items-center justify-content-center position-relative" style={{ width: '18rem', border: 'none' }}>
      <Card.Body className="text-center">
        {error && <p>Error: {error}</p>}
        {pedidos.length > 0 && (
          <Badge
            pill
            bg="warning"
            text="dark"
            className="position-absolute top-0 start-50 translate-middle-x"
            style={{ transform: 'translateY(-50%)' }}
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