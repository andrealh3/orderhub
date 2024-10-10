import { useState } from "react";
import { GenericForm } from "../GenericForm";
import { actualizarUsuario, agregarUsuario } from "../../services/UserService";
import { getToken } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";

export const AgregarUserLogin = ({ onClose, onRefetch, user }) => {
  const { auth, actualizarAuth } = useAuth();
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const [loading, setLoading] = useState(false); // Estado que indica si se está cargando

  const campos = [
    { name: 'username', label: 'Username', type: 'text'},
    { name: 'email', label: 'Correo Electrónico', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'is_staff', label: 'Usuario staff', type: 'checkbox' },
    { name: 'is_superuser', label: 'Superusuario', type: 'checkbox' },
  ];

  const handleSubmit = (valores) => {
    setLoading(true); // Indica que el proceso de inicio de sesión está en curso
    setError('');
    if (user) {
      const token = getToken();
      actualizarUsuario(user.id, valores, token)
        .then(() => {
          if (auth?.me?.id === user.id) {
            actualizarAuth(valores); // Actualiza el estado de autenticación
          }
          onRefetch();
          onClose();
        })
        .catch((error) => {
          setError(error)
        })
        .finally(() => {
          setLoading(false);
        })
    } else {
      valores.role = valores.is_superuser ? 'admin' : 'cliente';
      agregarUsuario(valores)
        .then(() => {
          onRefetch();
          onClose();
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }
  return (
    <>
      <div>
        <GenericForm
          campos={campos}
          loading={loading}
          onSubmit={handleSubmit}
          infoBoton={loading ? 'Cargando...' : (user ? 'Actualizar usuario' : 'Crear usuario')}
          initialValues={initialValues(user)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error.message}</p>} {/* Muestra mensajes de error */}
    </>
  )
}

const initialValues = (user) => {
  return {
    username: user?.username || "",
    email: user?.email || "",
    password: "", // Generalmente no quieres llenar la contraseña con datos existentes.
    is_active: true, // Convierte a booleano con una expresión más clara.
    is_staff: !!user?.is_staff,   // Convierte a booleano con una expresión más clara.
    is_superuser: !!user?.is_superuser,   // Convierte a booleano con una expresión más clara.
    role: user?.is_superuser ? 'admin': 'cliente', // Asigna el rol según el estado de superusuario.
  };
}
