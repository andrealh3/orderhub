import { BASE_API, getToken} from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerUsuariosApi = () => {
  const token = getToken()
  const url = `${BASE_API}/usuario/`;
  const parametros = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetchWithToken(url, parametros)
    .then(respuesta => respuesta.json())
    .catch(error => {
      throw error;
    });
};

export const registrarUsuarioApi = (datos) => {
  const url = `${BASE_API}/usuario/`;
  const parametros = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  return fetch(url, parametros)
    .then(respuesta => {
      if (!respuesta.ok) {
        return respuesta.json().then(errorData => {
          throw new Error(errorData.detail || 'Error al crear usuario');
        });
      }
      return respuesta.json();
    })
    .catch(error => {
      throw error;
    });
};

export const agregarUsuarioApi = (datos) => {
  const token = getToken()

  const url = `${BASE_API}/usuario/`;
  const parametros = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  };

  return fetchWithToken(url, parametros)
    .then(respuesta => {
      if (!respuesta.ok) {
        return respuesta.json().then(errorData => {
          throw new Error(errorData.detail || 'Error al crear categoria');
        });
      }
      return respuesta.json();
    })
    .catch(error => {
      throw error;
    });
};


export const actualizarUsuarioApi = (id, datos) => {
  const token = getToken()
  const url = `${BASE_API}/usuario/${id}/`;
  const parametros = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  };
  
  return fetchWithToken(url, parametros)
    .then(respuesta => respuesta.json())
    .catch(error => {
      throw error;
    });
};


export const eliminarUsuarioApi = (id) => {
  const token = getToken();
  const url = `${BASE_API}/usuario/${id}/`;
  const parametros = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetchWithToken(url, parametros)
    .then(respuesta => {
      // Comprobar si la respuesta tiene contenido
      if (respuesta.status === 204) {
        return {}; // Si es No Content, devuelve un objeto vacío
      } else if (!respuesta.ok) {
        return respuesta.json().then(errorData => {
          throw new Error(errorData.detail || 'Error al eliminar la categoría');
        });
      }
      return respuesta.json(); // Si hay contenido, lo parseamos
    })
    .catch(error => {
      throw error;
    });
};