import { BASE_API, getToken} from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerMesasApi = () => {
  const token = getToken()
  const url = `${BASE_API}/mesa/`;
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

export const agregarMesasApi = (datos) => {
  const token = getToken()

  const url = `${BASE_API}/mesa/`;
  const parametros = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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

export const obtenerMesaApi = (id) => {
  const token = getToken()
  const url = `${BASE_API}/mesa/${id}/`;
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

export const actualizarMesasApi = (id, datos) => {
  const token = getToken()
  const url = `${BASE_API}/mesa/${id}/`;
  const parametros = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
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

export const eliminarMesaApi = (numero) => {
  const token = getToken();
  const url = `${BASE_API}/mesa/${numero}/`;
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

export const obtenerSiguienteNumeroMesaApi = () => {
  const token = getToken();
  const url = `${BASE_API}/mesa/siguiente_numero/`;
  const parametros = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetchWithToken(url, parametros)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    });
};