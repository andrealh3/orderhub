import { useEffect } from "react";
import { usePedido } from "../../../hooks/usePedido"
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { HeaderPage } from "../HeaderPage";
import { ListaPedidos } from "./ListaPedidos";

export const DetallesMesaPedido = () => {
  const { id } = useParams();
  const { loading, pedidos, obtenerPedidosPorMesa} = usePedido();

  useEffect(() => {
    obtenerPedidosPorMesa(id);
  }, []);
  
  return (
    <div>
      <HeaderPage title={`Mesa ${id}`} />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ): (
        <ListaPedidos pedidos={pedidos}/>
      )}
    </div>
  )
}
