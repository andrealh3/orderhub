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