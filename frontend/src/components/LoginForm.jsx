import React, { useState } from 'react';
import { GenericForm } from './GenericForm';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';


export const LoginForm = () => {
  const { login } = useAuth();

  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const [loading, setLoading] = useState(false); // Estado que indica si se está cargando

  const campos = [
    { name: 'email', label: 'Correo Electrónico', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];

  
  const handleSubmit = (valores) => {
    setLoading(true); // Indica que el proceso de inicio de sesión está en curso
    setError(''); // Resetea el mensaje de error
    login(valores);
  };

  return (
    <>
      <h1>Iniciar Sesión</h1>
      <div>
        <GenericForm
          campos={campos}
          loading={loading}
          onSubmit={handleSubmit}
          infoBoton={loading ? 'Cargando...' : 'Iniciar Sesión'}
        />
        <p><Link to="/crear">Crear usuario</Link></p>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra mensajes de error */}
    </>
  );
};














// import React, { useState } from 'react';
// // import { iniciarSesion, obtenerMiUsuario } from '../../services/UserService';
// import { GenericForm } from './GenericForm';
// // import { toast } from 'react-toastify';
// import 'react-toastify/ReactToastify.css';
// import { useAuth } from '../hooks/useAuth';
// import { Link } from 'react-router-dom';

// /**
//  * Componente de inicio de sesión para autenticar a un usuario.
//  * 
//  * Este componente presenta un formulario que solicita al usuario su correo electrónico 
//  * y contraseña. Al enviar el formulario, se realiza una solicitud de inicio de sesión y,
//  * si es exitosa, se almacena el token de acceso y se obtiene la información del usuario.
//  * 
//  * @returns {JSX.Element} - Componente que contiene el formulario de inicio de sesión.
//  */
// export const LoginForm = () => {
//   const { login } = useAuth();

//   const [error, setError] = useState(''); // Estado para almacenar mensajes de error
//   const [loading, setLoading] = useState(false); // Estado que indica si se está cargando

//   // Definición de los campos del formulario
//   const campos = [
//     { name: 'email', label: 'Correo Electrónico', type: 'email' },
//     { name: 'password', label: 'Contraseña', type: 'password' },
//   ];

//   /**
//    * Maneja el envío del formulario de inicio de sesión.
//    * 
//    * @param {Object} valores - Valores del formulario, que contiene el correo electrónico y la contraseña.
//    */
//   const handleSubmit = async (valores) => {
//     setLoading(true); // Indica que el proceso de inicio de sesión está en curso
//     setError(''); // Resetea el mensaje de error

//     try {
//       await login(valores);
//     } catch (error) {
//       // Manejo de errores
//       console.error('Error en el inicio de sesión:', error);
//       setError('Usuario o contraseña incorrectos.'); // Actualiza el estado de error
//     } finally {
//       setLoading(false); // Restablece el estado de carga
//     }
//   };

//   return (
//     <>
//       <h1>Iniciar Sesión</h1>
//       <div>
//         <GenericForm
//           campos={campos}
//           loading={loading}
//           onSubmit={handleSubmit}
//           infoBoton={loading ? 'Cargando...' : 'Iniciar Sesión'}
//         />
//         <p><Link to="/crear">Crear usuario</Link></p>
//       </div>
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra mensajes de error */}
//     </>
//   );
// };