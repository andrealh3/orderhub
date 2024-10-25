import { BASE_API, getToken } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const obtenerPedidosPorMesaApi = async (idMesa, estado = "", ordenamiento = "") => {
  try {
    const token = getToken();
    const filtroMesa = `mesa=${idMesa}`;
    const filtroEstado = `estado=${estado}`;
    const filtroCerrar = "cerrado=False";

    const url = `${BASE_API}/pedido/?${filtroMesa}&${filtroEstado}&${filtroCerrar}`;
    const parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const respuesta = await fetchWithToken(url, parametros);

    // Verifica si la respuesta es ok (código 200-299)
    if (!respuesta.ok) {
      const errorMsg = await respuesta.text(); // Obtener texto de la respuesta en caso de error
      throw new Error(`Error ${respuesta.status}: ${errorMsg}`);
    }

    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error("Error al obtener pedidos por mesa:", error);
    throw error;
  }
}


export const verificarPedidoEntregadoApi = async (id) => {
  try {
    const url = `${BASE_API}/pedido/${id}/`;
    const parametros = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    //   body: JSON.stringify({
    //     status: ESTADO_PEDIDO.ENTREGADO,
    //   }),
    };

    const respuesta = await fetch(url, parametros);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
}

export const agregarPedidoAMesaApi = async (idMesa, idProducto) => {
  try {
    const url = `${BASE_API}/pedido/`;
    const parametros = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: ESTADO_PEDIDO.PENDIENTE,
        table: idMesa,
        product: idProducto,
      }),
    };
    await fetch(url, parametros);
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
        payment: idPago,
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
        close: true,
      }),
    };
    await fetch(url, parametros);
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
