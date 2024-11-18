import { useState } from "react";
import {
  obtenerPedidosPorMesaApi,
  verificarPedidoEntregadoApi,
  agregarPedidoAMesaApi,
  agregarPagoAPedidoApi,
  cerrarPedidoApi,
  obtenerPedidosPorPagoApi,
  verificarPedidoEnProcesoApi,
} from "../services/PedidoService";

export const usePedido = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pedidos, setPedidos] = useState(null);

  const obtenerPedidosPorMesa = async (idMesa, estado = [], ordenamiento = "") => {
    try {
      setLoading(true);
      const respuesta = await obtenerPedidosPorMesaApi(idMesa, estado, ordenamiento);
      setPedidos(respuesta);
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
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
    pedidos,
    obtenerPedidosPorMesa,
    verificarPedidoEntregado,
    verificarPedidoEnProceso,
    agregarPedidoAMesa,
    agregarPagoAPedido,
    cerrarPedido,
    obtenerPedidosPorPago,
  };
}