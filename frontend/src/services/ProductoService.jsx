import { BASE_API, getToken} from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerProductosApi = () => {
  const token = getToken()
  const url = `${BASE_API}/producto/`;
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

export const agregarProductosApi = (datos) => {
  const token = getToken()

  const url = `${BASE_API}/producto/`;
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
          console.log(errorData)
          throw new Error(errorData);
        });
      }
      return respuesta.json();
    })
};

export const obtenerProductoApi = (id) => {
  const token = getToken()
  const url = `${BASE_API}/producto/${id}/`;
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

export const actualizarProductoApi = (id, datos) => {
  const token = getToken()
  const url = `${BASE_API}/producto/${id}/`;
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

export const eliminarProductoApi = (id) => {
  const token = getToken();
  const url = `${BASE_API}/producto/${id}/`;
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