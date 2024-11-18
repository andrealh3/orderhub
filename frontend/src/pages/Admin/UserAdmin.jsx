import { useEffect, useState } from "react"
import { HeaderPage } from "../../components/Admin/HeaderPage";
import { ListarUsers } from "../../components/Admin/Users/ListarUsers";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AgregarUserLogin } from "../../components/Admin/Users/AgregarUserForm";
import { Spinner } from "react-bootstrap";
import { useUsuarios } from "../../hooks/useUsuarios";

export const UserAdmin = () => {
  const [titleModal, setTitleModal] = useState(sessionStorage.getItem('titleModal') || null);
  const [showModal, setShowModal] = useState(sessionStorage.getItem('showModal') === 'true');
  const nombreValoresFormularios = "usuarioValores";
  const [usuarioValores, setUsuarioValores] = useState(JSON.parse(sessionStorage.getItem(nombreValoresFormularios)) || null);
  
  const [refresh, setRefresh] = useState(false);

  const { 
    usuarios: users, 
    usuarioActual: currentUserId, 
    loading, 
    error,
    eliminarUsuario,
  } = useUsuarios(refresh);

  useEffect(() => {
    if (showModal) {
      sessionStorage.setItem('titleModal', titleModal);
      sessionStorage.setItem('showModal', showModal);
      sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(usuarioValores));
    } else {
      sessionStorage.removeItem("titleModal");
      sessionStorage.removeItem("showModal");
      sessionStorage.removeItem(nombreValoresFormularios);
      setTitleModal(null);
      setUsuarioValores(null);
    }
  }, [showModal]);

  const openCloseModal = () => setShowModal(prev => !prev);
  const onRefresh = () => setRefresh(prev => !prev);

  const getContentModal = () => {
    if (titleModal === "Nuevo usuario") {
      return <AgregarUserLogin onClose={openCloseModal} onRefresh={onRefresh} user={usuarioValores} nombreValoresFormularios={nombreValoresFormularios} />;
    } else if (titleModal === "Actualizar usuario" && usuarioValores) {
      return <AgregarUserLogin onClose={openCloseModal} onRefresh={onRefresh} user={usuarioValores} nombreValoresFormularios={nombreValoresFormularios} />;
    }
    return null;
  };

  const agregarUsuario = () => {
    setTitleModal("Nuevo usuario");
    setUsuarioValores(null);
    openCloseModal();
  }

  const actualizarUsuario = (usuario) => {
    setTitleModal("Actualizar usuario");
    setUsuarioValores(usuario);
    openCloseModal();
  }

  return (
    <>
      <HeaderPage title='Usuarios' btnNuevo='Nuevo usuario' btnClickNuevo={agregarUsuario} />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
          <ListarUsers users={users} actualizarUsuario={actualizarUsuario} eliminarUsuario={eliminarUsuario} currentUserId={currentUserId} />
        )
      }
      <ModalBasic show={showModal} size="lg" onClose={openCloseModal} title={titleModal} children={getContentModal()} />
      {error && <p style={{ color: 'red' }}>{error.message}</p>} {/* Muestra mensajes de error */}
    </>
  )
}
