import { useState, useEffect } from 'react';
import { HeaderPage } from '../../components/Admin/HeaderPage';
import { AgregarProductosForm } from '../../components/Admin/Productos/AgregarProductosForm';
import { ModalBasic } from '../../components/Common/ModalBasic';
import { ListarProductos } from '../../components/Admin/Productos/ListarProductos';
import { Spinner } from 'react-bootstrap';
import { AgregarCategoriaForm } from '../../components/Admin/Categorias/AgregarCategoriaForm';
import { useProductos } from '../../hooks/useProductos';
import { useCategorias } from '../../hooks/useCategorias';

export const ProductosAdmin = () => {
  const [titleModal, setTitleModal] = useState(sessionStorage.getItem('titleModal') || null);
  const [titleModal2, setTitleModal2] = useState(sessionStorage.getItem('titleModal2') || null);
  const [showModal, setShowModal] = useState(sessionStorage.getItem('showModal') === 'true');
  const [refresh, setRefresh] = useState(false);

  const nombreValoresFormularios = "productoValores";
  const nombreValoresFormularios2 = "categoriaValores";

  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(sessionStorage.getItem('mostrarModalCategoria') === 'true');
  const [productoValores, setProductoValores] = useState(JSON.parse(sessionStorage.getItem(nombreValoresFormularios)) || null);
  const [categoriaValores, setCategoriaValores] = useState(JSON.parse(sessionStorage.getItem(nombreValoresFormularios2)) || null);

  const { productos, loading, error, eliminarProducto } = useProductos(refresh);
  const { obtenerCategorias } = useCategorias();

  useEffect(() => {
    if (showModal || mostrarModalCategoria) {
      sessionStorage.setItem('titleModal', titleModal);
      sessionStorage.setItem('titleModal2', titleModal2);
      sessionStorage.setItem('showModal', showModal);
      sessionStorage.setItem('mostrarModalCategoria', mostrarModalCategoria);
      sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(productoValores));
      sessionStorage.setItem(nombreValoresFormularios2, JSON.stringify(categoriaValores));
    } else {
      sessionStorage.removeItem("titleModal");
      sessionStorage.removeItem("titleModal2");
      sessionStorage.removeItem("showModal");
      sessionStorage.removeItem(nombreValoresFormularios);
      sessionStorage.removeItem("mostrarModalCategoria");
      sessionStorage.removeItem(nombreValoresFormularios2);
      setTitleModal(null);
      setProductoValores(null);
      setCategoriaValores(null);
      setMostrarModalCategoria(false);
    }
  }, [showModal, mostrarModalCategoria, productoValores, categoriaValores, titleModal]);

  const openCloseModal = () => {
    setShowModal(prev => !prev);
  };

  const mostrarModal = () => setMostrarModalCategoria(prev => !prev);
  const onRefresh = () => setRefresh(prev => !prev);

  const agregarProducto = () => {
    setTitleModal("Nuevo producto");
    setProductoValores(null);
    openCloseModal();
  };

  const actualizarProducto = (producto) => {
    setTitleModal("Actualizar producto");
    setProductoValores(producto);
    openCloseModal();
  };

  const agregarCategoria = () => {
    setTitleModal2("Nueva categoria");
    setCategoriaValores(null);
    mostrarModal();
  };

  const getContentModal = () => {
    if (titleModal === "Nuevo producto" || titleModal === "Actualizar producto") {
      return <AgregarProductosForm 
                onClose={openCloseModal} 
                onRefresh={onRefresh} 
                mostrarModal={mostrarModal} 
                producto={productoValores} 
                nombreValoresFormularios={nombreValoresFormularios}
                agregarCategoria={agregarCategoria} // Pasar la función aquí
              />;
    }
    return null;
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
          productos={productos} 
          actualizarProducto={actualizarProducto} 
          eliminarProducto={eliminarProducto}
        />
      )}
      <ModalBasic 
        show={showModal} 
        size="lg" 
        onClose={openCloseModal} 
        title={titleModal} 
        children={getContentModal()} 
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {mostrarModalCategoria && (
        <ModalBasic
          show={mostrarModalCategoria}
          size="lg"
          onClose={() => {
            openCloseModal();
            setMostrarModalCategoria(false);
          }}
          title={titleModal2}
          children={
            <AgregarCategoriaForm
              onClose={() => {
                openCloseModal();
                setMostrarModalCategoria(false);
                obtenerCategorias();
              }}
              onRefresh={obtenerCategorias}
              categoria={categoriaValores}
              nombreValoresFormularios={nombreValoresFormularios2}
            />
          }
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}