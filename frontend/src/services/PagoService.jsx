import { BASE_API, ESTADO_PAGO } from "../utils/constants";
import { fetchWithToken } from "./fetchWithToken";

export const crearPagoApi = async (datosPago) => {
  try {
    const url = `${BASE_API}/pago/`;
    const parametros = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosPago),
    };

    const respuesta = await fetchWithToken(url, parametros);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
};

export const actualizarPagoApi = async (idPago, datosActualizados) => {
  const response = await fetchWithToken(`${BASE_API}/pago/${idPago}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosActualizados),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar el pago");
  }
  return response.json();
};


export const obtenerPagoPorMesaApi = async (idMesa) => {
  try {
    const filtroMesa = `mesa=${idMesa}`;
    const filtroEstado = `estadoPago=${ESTADO_PAGO.PENDIENTE}`;

    const url = `${BASE_API}/pago/?${filtroMesa}&${filtroEstado}/`;
    const parametros = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const respuesta = await fetchWithToken(url, parametros);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
};

export const cerrarPagoApi = async (idPago) => {
  try {
    const url = `${BASE_API}/pago/${idPago}/`;
    const parametros = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado_pago: ESTADO_PAGO.PAGADO,
      }),
    };
    await fetchWithToken(url, parametros);
  } catch (error) {
    throw error;
  }
};

export const obtenerPagosApi = async () => {
  try {
    const filtroPago = `estadoPago=${ESTADO_PAGO.PAGADO}`;
    const filtroOrdenamiento = "ordering=fecha_creacion";

    const url = `${BASE_API}/pago/?${filtroPago}&${filtroOrdenamiento}`;

    const respuesta = await fetchWithToken(url);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
};
