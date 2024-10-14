import { useEffect, useState } from "react";
import { AgregarCategoriaForm } from "../../components/Admin/Categorias/AgregarCategoriaForm";
import { HeaderPage } from "../../components/Admin/HeaderPage";
import { ListarCategorias } from "../../components/Admin/Categorias/ListarCategorias";
import { obtenerCategoriasApi, eliminarCategoriaApi } from "../../services/CategoriaService";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { Spinner } from "react-bootstrap";

export const CategoriasAdmin = () => {
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    obtenerCategoriasApi()
      .then((categoriaObtenida) => {
        if (Array.isArray(categoriaObtenida)) {
          setCategoria(categoriaObtenida);
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

  const agregarCategoria = () => {
    setTitleModal("Nueva categoria");
    setContentModal(<AgregarCategoriaForm onClose={openCloseModal} onRefetch={onRefetch} />);
    openCloseModal();
  };

  const actualizarCategoria = (categoria) => {
    setTitleModal("Actualizar categoria");
    setContentModal(<AgregarCategoriaForm onClose={openCloseModal} onRefetch={onRefetch} categoria={categoria} />);
    openCloseModal();
  };

  const eliminarCategoria = (categoria) => {
    setLoading(true);
    eliminarCategoriaApi(categoria.id)
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
      <HeaderPage title="Categorias" btnNuevo="Nueva categoria" btnClickNuevo={agregarCategoria} />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
        <ListarCategorias categoria={categoria} actualizarCategoria={actualizarCategoria} eliminarCategoria={eliminarCategoria} />
      )}
      <ModalBasic show={showModal} size="lg" onClose={openCloseModal} title={titleModal} children={contentModal} />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensajes de error */}
    </>
  );
};
