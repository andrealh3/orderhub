import { BASE_API } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerCategoriasApi = async () => {
  const url = `${BASE_API}/categoria/`;
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

export const agregarCategoriasApi = async (datos) => {
  const url = `${BASE_API}/categoria/`;
  const parametros = {
    method: "POST",
    body: datos,
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

export const obtenerCategoriaApi = async (id) => {
  const url = `${BASE_API}/categoria/${id}/`;
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

export const actualizarCategoriasApi = async (id, datos) => {
  const url = `${BASE_API}/categoria/${id}/`;
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

export const eliminarCategoriaApi = async (id) => {
  const url = `${BASE_API}/categoria/${id}/`;
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


export const tieneProductosEnCategoriaApi = async (id) => {
  const url = `${BASE_API}/categoria/${id}/tiene_productos/`;
  const parametros = {
    method: "GET",
  };

  try {
    const response = await fetchWithToken(url, parametros);
    
    // Verificar si la respuesta es correcta
    if (!response.ok) {
      throw new Error(`Error al verificar productos en la categoría: ${response.statusText}`);
    }

    const data = await response.json();
    return data.tieneProductos;
  } catch (error) {
    console.error(error);
    throw new Error('Error al comprobar si la categoría tiene productos.');
  }
};