import React from 'react';
import { GenericForm } from './FormGeneric/GenericForm';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import '../styles/LoginForm.scss';

export const LoginForm = () => {
  const { login, loading, error } = useAuth();

  const campos = [
    { name: 'email', label: 'Correo Electrónico', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];

  const handleSubmit = async (valores) => {
    await login(valores);
  };

  return (
    <div className="login-form-container">
      <div className="login-form-box">
        <h1>Iniciar Sesión</h1>
        <GenericForm
          campos={campos}
          loading={loading}
          onSubmit={handleSubmit}
          infoBoton={loading ? 'Cargando...' : 'Iniciar Sesión'}
        />
        <Link to="/crear" className="link">Crear usuario</Link>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};