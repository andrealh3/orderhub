import { useEffect, useState } from "react"
import { obtenerUsuariosApi, eliminarUsuarioApi } from "../../services/UserService";
import { HeaderPage } from "../../components/Admin/HeaderPage";
import { ListarUsers } from "../../components/Admin/Users/ListarUsers";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AgregarUserLogin } from "../../components/Admin/Users/AgregarUserForm";
import { Spinner } from "react-bootstrap";
import { obtenerMiUsuario } from "../../services/AuthService";
import { getToken } from "../../utils/constants";

export const UserAdmin = () => {
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const [loading, setLoading] = useState(false); // Estado que indica si se está cargando
  const [users, setUsers] = useState([]);
  const [refetch, setRefetch] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    setLoading(true);
    obtenerUsuariosApi()
      .then((usuarios) => {
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
  }, [refetch]);

  useEffect(() => {
    const obtenerUsuario = () => {
      const token = getToken(); // Obtén el token del usuario autenticado
      if (token) {
        obtenerMiUsuario(token)
          .then((me) => {
            setCurrentUserId(me.id); // Guarda el ID del usuario actual
          })
          .catch((error) => {
            console.error("Error obteniendo el usuario actual:", error);
            setError("No se pudo obtener el usuario actual");
          });
      }
    };

    obtenerUsuario(); // Llamada a la función para obtener el usuario actual
  }, []);


  const openCloseModal = () => setShowModal(prev => !prev);
  const onRefetch = () => setRefetch(prev => !prev);

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
    setLoading(true);
    eliminarUsuarioApi(usuario.id)
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
      <ModalBasic show={showModal} size="lg" onClose={openCloseModal} title={titleModal} children={contentModal} />
    </>
  )
}
