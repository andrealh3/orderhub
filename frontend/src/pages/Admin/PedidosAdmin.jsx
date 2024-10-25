import { useEffect, useState } from "react";
import { HeaderPage } from "../../components/Admin/HeaderPage"
import { obtenerMesasApi } from "../../services/MesaService";
import { Spinner } from "react-bootstrap";
import { ListarMesasAdmin } from "../../components/Admin/Mesas/ListarMesasAdmin";

export const PedidosAdmin = () => {
  const [mesas, setMesas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    obtenerMesasApi()
      .then((mesasObtenida) => {
        if (Array.isArray(mesasObtenida)) {
          setMesas(mesasObtenida);
        } else {
          setError('Los datos obtenidos no son válidos.');
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <HeaderPage title="Restaurante" />
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