import { BASE_API, ESTADO_PEDIDO } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerPedidoPorMesaApi = async (idMesa, ordenamiento = "") => {
  try {
    const filtroMesa = `mesa=${idMesa}`;
    const filtroCerrar = "cerrado=False";
    const filtroOrdenamiento = ordenamiento ? `ordering=${ordenamiento}` : "";
    const url = `${BASE_API}/pedido/?${filtroMesa}&${filtroCerrar}&${filtroOrdenamiento}`;
    const parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const respuesta = await fetchWithToken(url, parametros);

    if (!respuesta.ok) {
      const errorMsg = await respuesta.text();
      throw new Error(`Error ${respuesta.status}: ${errorMsg}`);
    }

    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error("Error al obtener pedidos por mesa:", error);
    throw error;
  }
};

export const verificarPedidoEntregadoApi = async (id) => {
  try {
    const url = `${BASE_API}/pedido/${id}/`;
    const parametros = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: ESTADO_PEDIDO.COMPLETADO,
      }),
    };

    const respuesta = await fetchWithToken(url, parametros);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
}

export const obtenerPedidoAbiertoApi = async (idMesa) => {
  try {
    const response = await fetchWithToken(`${BASE_API}/pedido/?mesa=${idMesa}&cerrado=false`);
    const data = await response.json();
    return data.length > 0 ? data[0] : null;  // Devuelve el primer pedido encontrado o null si no hay
  } catch (error) {
    return null;
  }
};

export const verificarPedidoEnProcesoApi = async (id) => {
  try {
    const url = `${BASE_API}/pedido/${id}/`;
    const parametros = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: ESTADO_PEDIDO.EN_PROCESO,
      }),
    };

    const respuesta = await fetchWithToken(url, parametros);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
}

export const agregarPedidoAMesaApi = async (idMesa) => {
  try {
    const url = `${BASE_API}/pedido/`;
    const parametros = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: ESTADO_PEDIDO.PENDIENTE,
        mesa: parseInt(idMesa),
      }),
    };
    const respuesta = await fetchWithToken(url, parametros);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
}

export const agregarPagoAPedidoApi = async (idPedido, idPago) => {
  try {
    const url = `${BASE_API}/pedido/${idPedido}/`;
    const parametros = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pago: idPago,
      }),
    };
    await fetch(url, parametros);
  } catch (error) {
    throw error;
  }
}

export const cerrarPedidoApi = async (idPedido) => {
  try {
    const url = `${BASE_API}/pedido/${idPedido}/`;
    const parametros = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cerrado: true,
        estado: ESTADO_PEDIDO.COMPLETADO,
      }),
    };
    await fetchWithToken(url, parametros);
  } catch (error) {
    throw error;
  }
}

export const obtenerPedidosPorPagoApi = async (idPago) => {
  try {
    const filtroPago = `payment=${idPago}`;

    const url = `${BASE_API}/pedido/?${filtroPago}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
}
