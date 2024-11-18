import { BASE_API, removeToken, setToken } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const iniciarSesion = async (valoresFormulario) => {
  const url = `${BASE_API}/autor/login/`;
  const parametros = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valoresFormulario),
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.detail || "Usuario o contraseña incorrectos");
    }

    const data = await respuesta.json();
    setToken(data.access, data.refresh); // Almacena tokens
    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const obtenerMiUsuario = async () => {
  const url = `${BASE_API}/autor/me/`;
  const parametros = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetchWithToken(url, parametros);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado. Por favor, verifica tus credenciales.');
      } else if (response.status === 404) {
        throw new Error('Recurso no encontrado.');
      } else {
        throw new Error('Error en la petición. Código de estado: ' + response.status);
      }
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refresh) => {
  const url = `${BASE_API}/autor/token/refresh/`;
  const parametros = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  };

  try {
    const response = await fetchWithToken(url, parametros);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado. Por favor, verifica tus credenciales.');
      } else if (response.status === 404) {
        throw new Error('Recurso no encontrado.');
      } else {
        throw new Error('Error en la petición. Código de estado: ' + response.status);
      }
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  removeToken();  // Elimina tokens del almacenamiento local
  return Promise.resolve();
};
