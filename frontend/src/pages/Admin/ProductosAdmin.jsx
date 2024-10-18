import { useEffect, useState } from 'react';
import { HeaderPage } from '../../components/Admin/HeaderPage'
import { AgregarProductosForm } from '../../components/Admin/Productos/AgregarProductosForm';
import { eliminarProductoApi, obtenerProductosApi } from '../../services/ProductoService';
import { ModalBasic } from '../../components/Common/ModalBasic';
import { ListarProductos } from '../../components/Admin/Productos/ListarProductos';
import { Spinner } from 'react-bootstrap';
import { AgregarCategoriaForm } from '../../components/Admin/Categorias/AgregarCategoriaForm';
import { obtenerCategoriasApi } from '../../services/CategoriaService';

export const ProductosAdmin = () => {
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);

  useEffect(() => {
    setLoading(true);
    obtenerProductosApi()
      .then((productosObtenidos) => {
        if (Array.isArray(productosObtenidos)) {
          setProductos(productosObtenidos);
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
  const mostrarModal = () => setMostrarModalCategoria(prev => !prev);
  const onRefetch = () => setRefetch(prev => !prev);

  const actualizarCategorias = () => {
    obtenerCategoriasApi()
      .then((categoriaObtenida) => {
        if (Array.isArray(categoriaObtenida)) {
          setCategorias(categoriaObtenida);
        }
      });
  };

  const agregarProducto = () => {
    setTitleModal("Nuevo producto");
    setContentModal(<AgregarProductosForm onClose={openCloseModal}  onRefetch={onRefetch} mostrarModal={mostrarModal} />);
    openCloseModal();
  };

  const actualizarProducto = (producto) => {
    setTitleModal("Actualizar producto");
    setContentModal(<AgregarProductosForm onClose={openCloseModal} onRefetch={onRefetch} producto={producto}/>);
    openCloseModal();
  };

  const eliminarProducto = (producto) => {
    setLoading(true);
    eliminarProductoApi(producto.id)
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
      <HeaderPage title="Productos" btnNuevo="Nuevo producto" btnClickNuevo={agregarProducto} />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
        <ListarProductos 
          producto={productos} 
          actualizarProducto={actualizarProducto} 
          eliminarProducto={eliminarProducto}
        />
      )}
      <ModalBasic 
        show={showModal} 
        size="lg" 
        onClose={openCloseModal} 
        title={titleModal} 
        children={contentModal} 
      />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensajes de error */}
      
      {/* Modal para nueva categoría */}
      {mostrarModalCategoria && (
        <ModalBasic
          show={mostrarModalCategoria}
          size="lg"
          onClose={() => {
            openCloseModal();
            setMostrarModalCategoria(false);
          }}
          title="Agregar Nueva Categoría"
          children={
            <AgregarCategoriaForm
              onClose={() => {
                openCloseModal();
                setMostrarModalCategoria(false);
                actualizarCategorias();
              }}
              onRefetch={actualizarCategorias}
            />
          }
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}
