import React, { useState } from 'react';
import { GenericForm } from './GenericForm';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, setToken } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';
import { registrarUsuarioApi } from '../services/UserService';


export const CreateUserForm = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const [loading, setLoading] = useState(false); // Estado que indica si se está cargando
  const navigate = useNavigate();

  // Definición de los campos del formulario
  const campos = [
    { name: 'username', label: 'Nombre de usuario', type: 'text'},
    { name: 'email', label: 'Correo electrónico', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];

  
  const handleSubmit = (valores) => {
    setLoading(true); // Indica que el proceso de inicio de sesión está en curso
    setError(''); // Resetea el mensaje de error
    registrarUsuarioApi(valores)
      .then(( { user, accessToken, refreshToken } ) => {
        setToken(accessToken, refreshToken);
        setAuth({ token: getToken(), me: user });
        // Redirigir a /cliente o a /admin, dependiendo del usuario
        if (user.role === 'cliente') {
          navigate('/'); // Redirige a la página de clientes
        } else if (user.role === 'admin') {
          navigate('/admin'); // Redirige a la página de admin
        } else {
          navigate('/'); // Redirige a la página principal si no tiene un rol específico
        }
      })
      .catch((error) => {
        if (error.detail === 'User already exists') {
          setError('El usuario ya existe. Por favor, elige otro nombre de usuario.');
        } else {
          setError(error.message || 'Error desconocido');
        }
        setAuth(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <h1>Crear usuario</h1>
      <div>
        <GenericForm
          campos={campos}
          loading={loading}
          onSubmit={handleSubmit}
          infoBoton={loading ? 'Cargando...' : 'Crear usuario'}
        />
        <p><Link to="/">Iniciar sesion</Link></p>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra mensajes de error */}
    </>
  );
};