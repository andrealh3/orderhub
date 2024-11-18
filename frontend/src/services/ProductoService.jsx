import { BASE_API } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerProductosApi = async () => {
  const url = `${BASE_API}/producto/`;
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

export const agregarProductosApi = async (datos) => {
  const url = `${BASE_API}/producto/`;
  const parametros = {
    method: "POST",
    body: datos,
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData);
    }
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const obtenerProductoApi = async (id) => {
  const url = `${BASE_API}/producto/${id}/`;
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

export const actualizarProductoApi = async (id, datos) => {
  const url = `${BASE_API}/producto/${id}/`;
  const parametros = {
    method: "PATCH",
    body: datos,
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const eliminarProductoApi = async (id) => {
  const url = `${BASE_API}/producto/${id}/`;
  const parametros = {
    method: "DELETE",
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    if (respuesta.status === 204) {
      return {}; // Si es No Content, devuelve un objeto vacío
    } else if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.detail || 'Error al eliminar la categoría');
    }
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};
