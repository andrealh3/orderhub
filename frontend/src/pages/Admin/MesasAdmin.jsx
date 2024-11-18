import { useEffect, useState } from "react";
import { HeaderPage } from "../../components/Admin/HeaderPage"
import { ListarMesas } from "../../components/Admin/Mesas/ListarMesas";
import { Spinner } from "react-bootstrap";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AgregarMesaForm } from "../../components/Admin/Mesas/AgregarMesaForm";
import { useMesas } from "../../hooks/useMesas";

export const MesasAdmin = () => {
  const [titleModal, setTitleModal] = useState(sessionStorage.getItem('titleModal') || null);
  const [showModal, setShowModal] = useState(sessionStorage.getItem('showModal') === 'true');
  const [refresh, setRefresh] = useState(false);
  const nombreValoresFormularios = "mesaValores";
  const [mesaValores, setMesaValores] = useState(JSON.parse(sessionStorage.getItem(nombreValoresFormularios)) || null);
  const { mesas, loading, error, eliminarMesa } = useMesas(refresh);

  useEffect(() => {
    if (showModal) {
      sessionStorage.setItem('titleModal', titleModal);
      sessionStorage.setItem('showModal', showModal);
      sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(mesaValores));
    } else {
      sessionStorage.removeItem("titleModal");
      sessionStorage.removeItem("showModal");
      sessionStorage.removeItem(nombreValoresFormularios);
      setTitleModal(null);
      setMesaValores(null);
    }
  }, [showModal]);

  const openCloseModal = () => setShowModal(prev => !prev);
  const onRefresh = () => setRefresh(prev => !prev);
  
  const getContentModal = () => {
    if (titleModal === "Nueva mesa") {
      return <AgregarMesaForm onClose={openCloseModal} onRefresh={onRefresh} mesa={mesaValores} nombreValoresFormularios={nombreValoresFormularios} />;
    } else if (titleModal === "Actualizar mesa" && mesaValores) {
      return <AgregarMesaForm onClose={openCloseModal} onRefresh={onRefresh} mesa={mesaValores} nombreValoresFormularios={nombreValoresFormularios} />;
    }
    return null;
  };

  const agregarMesa = () => {
    setTitleModal("Nueva mesa");
    setMesaValores(null);
    openCloseModal();
  };
  
  const actualizarMesa = (mesa) => {
    setTitleModal("Actualizar mesa");
    setMesaValores(mesa);
    openCloseModal();
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
        <ListarMesas mesas={mesas} actualizarMesa={actualizarMesa} eliminarMesa={eliminarMesa} />
      )}
      <ModalBasic show={showModal} size="lg" onClose={openCloseModal} title={titleModal} children={getContentModal()} />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensajes de error */}
    </>
  )
}
