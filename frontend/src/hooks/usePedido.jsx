// usePedidoService.js
import { useState, useCallback } from "react";
import {
  obtenerPedidosPorMesaApi,
  verificarPedidoEntregadoApi,
  agregarPedidoAMesaApi,
  agregarPagoAPedidoApi,
  cerrarPedidoApi,
  obtenerPedidosPorPagoApi,
} from "../services/PedidoService";

export const usePedido = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pedidos, setPedidos] = useState(null);

  // Obtener pedidos por mesa
  const obtenerPedidosPorMesa = useCallback(async (idMesa, estado = "", ordenamiento = "") => {
    setLoading(true);
    setError(null);
    try {
      const result = await obtenerPedidosPorMesaApi(idMesa, estado, ordenamiento);
      setPedidos(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar pedido entregado
  const verificarPedidoEntregado = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await verificarPedidoEntregadoApi(id);
      setPedidos(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar pedido a mesa
  const agregarPedidoAMesa = useCallback(async (idMesa, idProducto) => {
    setLoading(true);
    setError(null);
    try {
      await agregarPedidoAMesaApi(idMesa, idProducto);
      setPedidos({ success: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar pago a pedido
  const agregarPagoAPedido = useCallback(async (idPedido, idPago) => {
    setLoading(true);
    setError(null);
    try {
      await agregarPagoAPedidoApi(idPedido, idPago);
      setPedidos({ success: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cerrar pedido
  const cerrarPedido = useCallback(async (idPedido) => {
    setLoading(true);
    setError(null);
    try {
      await cerrarPedidoApi(idPedido);
      setPedidos({ success: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener pedidos por pago
  const obtenerPedidosPorPago = useCallback(async (idPago) => {
    setLoading(true);
    setError(null);
    try {
      const result = await obtenerPedidosPorPagoApi(idPago);
      setPedidos(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    pedidos,
    obtenerPedidosPorMesa,
    verificarPedidoEntregado,
    agregarPedidoAMesa,
    agregarPagoAPedido,
    cerrarPedido,
    obtenerPedidosPorPago,
  };
};
