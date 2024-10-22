import { useEffect, useState } from "react";
import { HeaderPage } from "../../components/Admin/HeaderPage"
import { eliminarMesaApi, obtenerMesasApi } from "../../services/MesaService";
import { ListarMesas } from "../../components/Admin/Mesas/ListarMesas";
import { Spinner } from "react-bootstrap";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AgregarMesaForm } from "../../components/Admin/Mesas/AgregarMesaForm";

export const MesasAdmin = () => {
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mesa, setMesa] = useState([]);
  const [refetch, setRefetch] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    obtenerMesasApi()
      .then((mesasObtenida) => {
        if (Array.isArray(mesasObtenida)) {
          setMesa(mesasObtenida);
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
  }, [refetch]);
  
  const openCloseModal = () => setShowModal(prev => !prev);
  const onRefetch = () => setRefetch(prev => !prev);
  
  const agregarMesa = () => {
    setTitleModal("Nueva mesa");
    setContentModal(<AgregarMesaForm onClose={openCloseModal} onRefetch={onRefetch} />);
    openCloseModal();
  };
  
  const actualizarMesa = (mesa) => {
    setTitleModal("Actualizar mesa");
    setContentModal(<AgregarMesaForm onClose={openCloseModal} onRefetch={onRefetch} mesa={mesa} />);
    openCloseModal();
  };
  
  const eliminarMesa = (mesa) => {
    setLoading(true);
    eliminarMesaApi(mesa.id)
      .then(() => {
        onRefetch();
      })
      .catch((error) => {
        setError(error.message || "Error al eliminar la categoría");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <>
      <HeaderPage title="Mesas" btnNuevo="Nueva mesa" btnClickNuevo={agregarMesa} />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
        <ListarMesas mesa={mesa} actualizarMesa={actualizarMesa} eliminarMesa={eliminarMesa} />
      )}
      <ModalBasic show={showModal} size="lg" onClose={openCloseModal} title={titleModal} children={contentModal} />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensajes de error */}
    </>
  )
}
