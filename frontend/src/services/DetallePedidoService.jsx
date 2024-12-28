import { BASE_API } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerDetallesPedidoApi = async () => {
  const url = `${BASE_API}/detalle-pedido/`;
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

export const agregarDetallePedidoApi = async (datos) => {
  const url = `${BASE_API}/detalle-pedido/`;
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
      throw new Error(errorData.detail || 'Error al crear pedido');
    }
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

export const obtenerDetallePedidoApi = async (id) => {
  const url = `${BASE_API}/detalle-pedido/${id}/`;
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

export const obtenerDetallePedidoPorProductoApi = async (idPedido, idProducto) => {
  try {
    const response = await fetchWithToken(`${BASE_API}/detalle-pedido/?pedido=${idPedido}&producto=${idProducto}`);
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const actualizarDetallePedidoApi = async (id, datos) => {
  console.log(datos)
  const url = `${BASE_API}/detalle-pedido/${id}/`;
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

export const eliminarDetallePedidoApi = async (numero) => {
  const url = `${BASE_API}/detalle-pedido/${numero}/`;
  const parametros = {
    method: "DELETE",
  };

  try {
    const respuesta = await fetchWithToken(url, parametros);
    if (respuesta.status === 204) {
      return {}; // No Content
    } else if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.detail || 'Error al eliminar la pedido');
    }
    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};