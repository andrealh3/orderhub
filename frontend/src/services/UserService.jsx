import { BASE_API, getToken} from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerUsuarios = () => {
  const url = `${BASE_API}/usuario/`;
  const parametros = {
    method: "GET",
  };

  return fetchWithToken(url, parametros)
    .then(respuesta => respuesta.json())
    .catch(error => {
      throw error;
    });
};

export const registrarUsuario = (datos) => {
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

export const agregarUsuario = (datos) => {
  const url = `${BASE_API}/usuario/`;
  const parametros = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  return fetchWithToken(url, parametros)
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


export const actualizarUsuario = (id, datos) => {
  const url = `${BASE_API}/usuario/${id}/`;
  const parametros = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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
  const url = `${BASE_API}/usuario/${id}/`;
  const parametros = {
    method: "DELETE",
  };

  return fetchWithToken(url, parametros)
    .then(respuesta => {
      if (respuesta.status === 204) {
        return {};  // Sin contenido, usuario eliminado
      }
      return respuesta.json();
    })
    .catch(error => {
      throw error;
    });
};