import { useState } from "react";
import {
  verificarPedidoEntregadoApi,
  agregarPedidoAMesaApi,
  agregarPagoAPedidoApi,
  cerrarPedidoApi,
  obtenerPedidosPorPagoApi,
  verificarPedidoEnProcesoApi,
  obtenerPedidoAbiertoApi,
  obtenerPedidoPorMesaApi,
} from "../services/PedidoService";

export const usePedido = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pedido, setPedido] = useState(null);

  const obtenerPedidoPorMesa = async (idMesa, ordenamiento = "") => {
    try {
      setLoading(true);
      const respuesta = await obtenerPedidoPorMesaApi(idMesa, ordenamiento);
      setPedido(respuesta);
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }
  };
  
  const obtenerPedidoAbierto = async (idMesa) => {
    try {
      return await obtenerPedidoAbiertoApi(idMesa);
    } catch (error) {
      setError(error);
    }
  };

  const verificarPedidoEntregado = async (idPedido) => {
    try {
      await verificarPedidoEntregadoApi(idPedido);
    } catch (error) {
      setError(error);
    }
  };

  const verificarPedidoEnProceso = async (idPedido) => {
    try {
      await verificarPedidoEnProcesoApi(idPedido);
    } catch (error) {
      setError(error);
    }
  };

  const agregarPedidoAMesa = async (idMesa) => {
    try {
      const respuesta = await agregarPedidoAMesaApi(idMesa);
      return respuesta;
    } catch (error) {
      setError(error);
    }
  };

  const agregarPagoAPedido = async (idPedido, idPago) => {
    try {
      await agregarPagoAPedidoApi(idPedido, idPago);
    } catch (error) {
      setError(error);
    }
  };

  const cerrarPedido = async (idPedido) => {
    try {
      await cerrarPedidoApi(idPedido);
    } catch (error) {
      setError(error);
    }
  };

  const obtenerPedidosPorPago = async (idPago) => {
    try {
      return await obtenerPedidosPorPagoApi(idPago);
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    pedido,
    obtenerPedidoPorMesa,
    verificarPedidoEntregado,
    verificarPedidoEnProceso,
    agregarPedidoAMesa,
    agregarPagoAPedido,
    cerrarPedido,
    obtenerPedidosPorPago,
    obtenerPedidoAbierto,
  };
}