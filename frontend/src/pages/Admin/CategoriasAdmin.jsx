import { useEffect, useState } from "react";
import { AgregarCategoriaForm } from "../../components/Admin/Categorias/AgregarCategoriaForm";
import { HeaderPage } from "../../components/Admin/HeaderPage";
import { ListarCategorias } from "../../components/Admin/Categorias/ListarCategorias";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { Spinner } from "react-bootstrap";
import { useCategorias } from "../../hooks/useCategorias";

export const CategoriasAdmin = () => {
  const [titleModal, setTitleModal] = useState(sessionStorage.getItem('titleModal') || null);
  const [showModal, setShowModal] = useState(sessionStorage.getItem('showModal') === 'true');
  const nombreValoresFormularios = "categoriaValores";
  const [categoriaValores, setCategoriaValores] = useState(JSON.parse(sessionStorage.getItem(nombreValoresFormularios)) || null);
  const [refresh, setRefresh] = useState(false);
  const { categorias, error, loading, eliminarCategoria } = useCategorias(refresh);


  useEffect(() => {
    if (showModal) {
      sessionStorage.setItem('titleModal', titleModal);
      sessionStorage.setItem('showModal', showModal);
      sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(categoriaValores));
    } else {
      sessionStorage.removeItem("titleModal");
      sessionStorage.removeItem("showModal");
      sessionStorage.removeItem(nombreValoresFormularios);
      setTitleModal(null);
      setCategoriaValores(null);
    }
  }, [showModal]);

  const openCloseModal = () => setShowModal(prev => !prev);
  const onRefresh = () => setRefresh(prev => !prev);

  const getContentModal = () => {
    if (titleModal === "Nueva categoria") {
      return <AgregarCategoriaForm onClose={openCloseModal} onRefresh={onRefresh} categoria={categoriaValores} nombreValoresFormularios={nombreValoresFormularios} />;
    } else if (titleModal === "Actualizar categoria" && categoriaValores) {
      return <AgregarCategoriaForm onClose={openCloseModal} onRefresh={onRefresh} categoria={categoriaValores} nombreValoresFormularios={nombreValoresFormularios} />;
    }
    return null;
  };

  const agregarCategoria = () => {
    setTitleModal("Nueva categoria");
    setCategoriaValores(null);
    openCloseModal();
  };

  const actualizarCategoria = (categoria) => {
    setTitleModal("Actualizar categoria");
    setCategoriaValores(categoria);
    openCloseModal();
  };

  return (
    <>
      <HeaderPage title="Categorias" btnNuevo="Nueva categoria" btnClickNuevo={agregarCategoria} />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
        <ListarCategorias categorias={categorias} actualizarCategoria={actualizarCategoria} eliminarCategoria={eliminarCategoria} />
      )}
      <ModalBasic show={showModal} size="lg" onClose={openCloseModal} title={titleModal} children={getContentModal()}  />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensajes de error */}
    </>
  );
};
