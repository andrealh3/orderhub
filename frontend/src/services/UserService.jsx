import { BASE_API } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerUsuariosApi = async () => {
  const url = `${BASE_API}/usuario/`;
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

export const registrarUsuarioApi = async (datos) => {
  const url = `${BASE_API}/usuario/`;
  const parametros = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  try {
    const respuesta = await fetch(url, parametros);
    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.detail || 'Error al crear usuario');
    }
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const agregarUsuarioApi = async (datos) => {
  const url = `${BASE_API}/usuario/`;
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
      throw new Error(errorData.detail || 'Error al crear usuario');
    }
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const actualizarUsuarioApi = async (id, datos) => {
  const url = `${BASE_API}/usuario/${id}/`;
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

export const eliminarUsuarioApi = async (id) => {
  const url = `${BASE_API}/usuario/${id}/`;
  const parametros = {
    method: "DELETE",
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    if (respuesta.status === 204) {
      return {}; // Si es No Content, devuelve un objeto vacío
    } else if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.detail || 'Error al eliminar el usuario');
    }
    return await respuesta.json(); // Si hay contenido, lo parseamos
  } catch (error) {
    throw error;
  }
};