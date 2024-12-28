import { useState } from "react";
import {
  crearPagoApi,
  obtenerPagoPorMesaApi,
  cerrarPagoApi,
  obtenerPagosApi,
  actualizarPagoApi,
} from "../services/PagoService";

export const usePago = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagos, setPagos] = useState(null);

  const crearPago = async (datosPago) => {
    try {
      return await crearPagoApi(datosPago);
    } catch (error) {
      setError(error);
    }
  };

  const actualizarPago = async (idPago, datosActualizados) => {
    try {
      return await actualizarPagoApi(idPago, datosActualizados);
    } catch (error) {
      setError(error);
    }
  };
  

  const obtenerPagoPorMesa = async (idMesa) => {
    try {
      return await obtenerPagoPorMesaApi(idMesa);
    } catch (error) {
      setError(error);
    }
  };

  const cerrarPago = async (idPago) => {
    console.log(idPago)
    try {
      return await cerrarPagoApi(idPago);
    } catch (error) {
      setError(error);
    }
  };

  const obtenerPagos = async () => {
    try {
      setLoading(true);
      const response = await obtenerPagosApi();
      setLoading(false);
      setPagos(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    loading,
    pagos,
    crearPago,
    actualizarPago,
    obtenerPagoPorMesa,
    cerrarPago,
    obtenerPagos,
  };
}
