import React, { createContext, useState, useEffect } from 'react';
import { iniciarSesion, obtenerMiUsuario, logout as logoutService, refreshToken } from '../services/AuthService';
import { getRefreshToken, getToken, removeToken, setToken } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

// Crear el contexto de autenticación
export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

// Crear el proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(undefined); // auth será null si no hay sesión y un objeto con token si hay sesión

  // Verificar el token al cargar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();

      if (token) {
        try {
          const me = await obtenerMiUsuario();
          setAuth({ token, me });
        } catch (error) {
          await refrescarToken();
        }
      } else {
        setAuth(null);
      }
    };

    fetchUser();
  }, []);

  const actualizarAuth = (datosNuevoUser) => {
    setAuth(prev => ({
      ...prev,
      me: {
        ...prev?.me, // Si ya existe un objeto `me`, lo preserva
        ...datosNuevoUser, // Actualiza con los nuevos datos del usuario
      }
    }));
  };

  // Función para iniciar sesión
  const login = async (valoresFormulario) => {
    try {
      const { access, refresh } = await iniciarSesion(valoresFormulario);
      setToken(access, refresh);
      const me = await obtenerMiUsuario();
      setAuth({ token: getToken(), me });

      // Redirigir a /cliente o a /admin, dependiendo del usuario
      if (me.role === 'cliente') {
        navigate('/'); // Redirige a la página de clientes
      } else if (me.role === 'admin') {
        navigate('/admin'); // Redirige a la página de admin
      } else {
        navigate('/'); // Redirige a la página principal si no tiene un rol específico
      }
    } catch (error) {
      await refrescarToken(); // Si hay un error, intenta refrescar el token
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    if (auth) {
      removeToken(); // Elimina el token del localStorage
      logoutService();
      setAuth(null); // Restablece el estado de autenticación
    }
  };

  // Refrescar el token
  const refrescarToken = async () => {
    const tokenData = {
      access: getToken(),
      refresh: getRefreshToken(),
    };

    if (tokenData?.refresh) {
      try {
        const { access } = await refreshToken(tokenData.refresh);
        setToken(access, tokenData.refresh);
        const me = await obtenerMiUsuario();
        setAuth({ token: getToken(), me });
      } catch (error) {
        logout(); // Si no se puede refrescar el token, cerrar sesión
      }
    } else {
      logout(); // Si no hay refresh token, cerrar sesión
    }
  };

  // El contexto que se pasará a los componentes
  const valueContext = {
    auth,
    setAuth,
    login,
    logout,
    refrescarToken,
    actualizarAuth,
  };

  // Si `auth` es undefined, no renderizamos nada (esperando que cargue la sesión)
  if (auth === undefined) return null;

  // Proveer el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={valueContext}>
      {children}
    </AuthContext.Provider>
  );
}
