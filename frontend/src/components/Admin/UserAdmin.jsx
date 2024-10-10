import { useEffect, useState } from "react"
import { getToken } from "../../utils/constants";
import { obtenerUsuarios, eliminarUsuarioApi } from "../../services/UserService";
import { HeaderPage } from "./HeaderPage";
import { TableUsers } from "./TableUsers";
import { ModalBasic } from "../Common/ModalBasic";
import { AgregarUserLogin } from "./AgregarUserForm";

export const UserAdmin = () => {
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const [loading, setLoading] = useState(false); // Estado que indica si se está cargando
  const [users, setUsers] = useState([]);
  const [refetch, serRefetch] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      obtenerUsuarios(token)
        .then((usuarios) => {
          setLoading(true);
          setUsers((prevUsers) => {
            const userMap = new Map(prevUsers.map(user => [user.id, user])); // Crear un mapa de usuarios existentes por ID
          
            // Actualiza los usuarios existentes o agrega nuevos
            usuarios.forEach(user => {
              userMap.set(user.id, { ...userMap.get(user.id), ...user }); // Actualiza o agrega el usuario
            });
          
            return Array.from(userMap.values()); // Devuelve la lista de usuarios actualizada
          });
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() =>{
          setLoading(false);
        });
    } else {
    
    }
  }, [refetch]);

  const openCloseModal = () => setShowModal(prev => !prev);
  const onRefetch = () => serRefetch(prev => !prev);

  const agregarUsuario = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(<AgregarUserLogin onClose={openCloseModal} onRefetch={onRefetch} />);
    openCloseModal();
  }

  const actualizarUsuario = (usuario) => {
    setTitleModal("Actualizar usuario");
    setContentModal(<AgregarUserLogin onClose={openCloseModal} onRefetch={onRefetch} user={usuario} />);
    openCloseModal();
  }

  const eliminarUsuario = (usuario) => {
    const token = getToken();
    eliminarUsuarioApi(usuario.id, token)
      .then(()=>{
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== usuario.id));
        onRefetch();
      })
      .catch((error)=>{
        setError(error);
      })
      .finally(()=>{
        setLoading(false);
      })
  }
  return (
    <>
      <HeaderPage title='Usuarios' btnNuevo='Nuevo usuario' btnClickNuevo={agregarUsuario} />
      { loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>  
        ) : (
          <TableUsers users={users} actualizarUsuario={actualizarUsuario} eliminarUsuario={eliminarUsuario} />
        )
      }
      <ModalBasic show={showModal} size="lg" onClose={openCloseModal} title={titleModal} children={contentModal} />
    </>
  )
}
