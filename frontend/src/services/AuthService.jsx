import { BASE_API, getToken, removeToken, setToken } from "../utils/constants";

export const iniciarSesion = (valoresFormulario) => {
  const token = getToken();
  const url = `${BASE_API}/autor/login/`;
  const parametros = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valoresFormulario),
  };

  return fetch(url, parametros)
    .then(respuesta => {
      if (!respuesta.ok) {
        return respuesta.json().then(errorData => {
          throw new Error(errorData.detail || "Usuario o contraseña incorrectos");
        });
      }
      return respuesta.json();
    })
    .then(data => {
      setToken(data.access, data.refresh); // Almacena tokens
      return data;
    })
    .catch(error => {
      console.error('Error al iniciar sesión:', error);
      throw error;
    });
};


export const obtenerMiUsuario = (token) => {
  const url = `${BASE_API}/autor/me/`;
  const parametros = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(url, parametros)
    .then(response => {
      if (!response.ok) {
        // Si la respuesta no es correcta (error 401, 404, etc)
        if (response.status === 401) {
          throw new Error('No autorizado. Por favor, verifica tus credenciales.');
        } else if (response.status === 404) {
          throw new Error('Recurso no encontrado.');
        } else {
          throw new Error('Error en la petición. Código de estado: ' + response.status);
        }
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};


export const refreshToken = (refresh) => {
    const url = `${BASE_API}/autor/token/refresh/`; // Cambia la URL según tu API
    const parametros = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    };
  
    return fetch(url, parametros)
      .then(response => {
        if (!response.ok) {
          // Si la respuesta no es correcta (error 401, 404, etc)
          if (response.status === 401) {
            throw new Error('No autorizado. Por favor, verifica tus credenciales.');
          } else if (response.status === 404) {
            throw new Error('Recurso no encontrado.'); 
          } else {
            throw new Error('Error en la petición. Código de estado: ' + response.status);
          }
        }
        return response.json();
      })
      .catch(error => {
        throw error; // Re-lanza el error para manejarlo en el llamador
      });
  };

  
export const logout = () => {
  removeToken();  // Elimina tokens del almacenamiento local
  return Promise.resolve();
};