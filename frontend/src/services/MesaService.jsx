import { BASE_API } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerMesasApi = async () => {
  const url = `${BASE_API}/mesa/`;
  const parametros = {
    method: "GET",
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const agregarMesasApi = async (datos) => {
  const url = `${BASE_API}/mesa/`;
  const parametros = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.detail || 'Error al crear categoria');
    }
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const obtenerMesaApi = async (id) => {
  const url = `${BASE_API}/mesa/${id}/`;
  const parametros = {
    method: "GET",
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const actualizarMesasApi = async (id, datos) => {
  const url = `${BASE_API}/mesa/${id}/`;
  const parametros = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const eliminarMesaApi = async (numero) => {
  const url = `${BASE_API}/mesa/${numero}/`;
  const parametros = {
    method: "DELETE",
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    if (respuesta.status === 204) {
      return {}; // No Content
    } else if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.detail || 'Error al eliminar la categoría');
    }
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};
