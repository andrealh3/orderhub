import { BASE_API, getToken} from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerCategoriasApi = () => {
  const token = getToken()
  const url = `${BASE_API}/categoria/`;
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
}

export const agregarCategoriasApi = (datos) => {
  const token = getToken()

  const url = `${BASE_API}/categoria/`;
  const parametros = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: datos,
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

export const obtenerCategoriaApi = (id) => {
  const token = getToken()
  const url = `${BASE_API}/categoria/${id}/`;
  const parametros = {
    method: "GET",
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

export const actualizarCategoriasApi = (id, datos) => {
  const token = getToken()
  const url = `${BASE_API}/categoria/${id}/`;
  const parametros = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: datos,
  };
  
  return fetchWithToken(url, parametros)
    .then(respuesta => respuesta.json())
    .catch(error => {
      throw error;
    });
};

export const eliminarCategoriaApi = (id) => {
  const token = getToken();
  const url = `${BASE_API}/categoria/${id}/`;
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