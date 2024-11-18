import { HeaderPage } from "../../components/Admin/HeaderPage";
import { Spinner } from "react-bootstrap";
import { ListarMesasAdmin } from "../../components/Admin/Mesas/ListarMesasAdmin";
import { useMesas } from "../../hooks/useMesas";

export const PedidosAdmin = () => {
  const { loading, mesas } = useMesas();
  
  return (
    <>
      <HeaderPage title="Restaurante"/>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
        <ListarMesasAdmin mesas={mesas} />
      )}
    </>
  )
}