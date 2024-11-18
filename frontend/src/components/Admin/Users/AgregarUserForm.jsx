import { useState } from "react";
import { GenericForm } from "../../FormGeneric/GenericForm";
import { useAuth } from "../../../hooks/useAuth";
import { useUsuarios } from "../../../hooks/useUsuarios";

export const AgregarUserLogin = ({ onClose, onRefresh, user, nombreValoresFormularios }) => {
  const { auth, actualizarAuth } = useAuth();
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const [loading, setLoading] = useState(false); // Estado que indica si se está cargando
  const { agregarUsuario, actualizarUsuario } = useUsuarios();
  
  // Definir los campos del formulario, excluyendo 'is_staff' e 'is_superuser' si el usuario actual es superusuario.
  const campos = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Correo Electrónico', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    // Solo mostrar los campos 'is_staff' e 'is_superuser' si el usuario actual NO es el usuario autenticado
    ...((user?.id !== auth?.me?.id) ? [
      { name: 'is_staff', label: 'Usuario staff', type: 'checkbox' },
      { name: 'is_superuser', label: 'Superusuario', type: 'checkbox' },
    ] : []),
  ];

  const handleSubmit = async (valores) => {
    setLoading(true); // Indica que el proceso de inicio de sesión está en curso
    setError('');
    valores.role = valores.is_superuser ? 'admin' : 'cliente';
    try {
      if (user) {
        await actualizarUsuario(user.id, valores);
        if (auth?.me?.id === user.id) {
          actualizarAuth(valores); // Actualiza el estado de autenticación
        }
      } else {
        await agregarUsuario(valores); // Llama a agregar usuario en el hook
      }
      onRefresh();
      onClose();
    } catch (error) {
      setError(error.message || "Error al procesar la solicitud.");
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
          nombreValoresFormularios={nombreValoresFormularios}
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
