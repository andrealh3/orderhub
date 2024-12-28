import { useEffect } from "react";
import { HeaderPage } from "../../components/Admin/HeaderPage"
import { usePago } from "../../hooks/usePago"
import { Spinner } from "react-bootstrap";
import { ListarPagos } from "../../components/Admin/Pagos/ListarPagos";

export const PagosAdmin = () => {
  const { loading, pagos, obtenerPagos } = usePago();

  useEffect(() => {obtenerPagos()}, []);
  
  return (
    <>
      <HeaderPage title="Historial de pagos" />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
        <ListarPagos pagos={pagos} />
      )}
    </>
  )
}