import { useState, useEffect } from "react";
import { actualizarDetallePedidoApi, agregarDetallePedidoApi, eliminarDetallePedidoApi, obtenerDetallePedidoPorProductoApi, obtenerDetallePedidoApi, obtenerDetallesPedidoApi } from "../services/DetallePedidoService";


export const useDetallePedido = (refresh) => {
  const [detallesPedidos, setDetallesPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerDetallesPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerDetallesPedidoApi();
      setDetallesPedidos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerDetallePedidoPorProducto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerDetallePedidoPorProductoApi(id);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerDetallePedido = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerDetallePedidoApi(id);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const agregarDetallePedido = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoPedido = await agregarDetallePedidoApi(datos);
      setDetallesPedidos([...detallesPedidos, nuevoPedido]); // Actualiza el estado con la nueva mesa
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const actualizarDetallePedido = async (id, datos) => {
    setLoading(true);
    setError(null);
    try {
      const pedidoActualizado = await actualizarDetallePedidoApi(id, datos);
      setDetallesPedidos(
        detallesPedidos.map((pedido) => (pedido.id === id ? pedidoActualizado : pedido))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarDetallePedido = async (numero) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarDetallePedidoApi(numero);
      setDetallesPedidos(detallesPedidos.filter((pedido) => pedido.numero !== numero));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDetallesPedidos();
  }, [refresh]);

  return {
    detallesPedidos,
    loading,
    error,
    obtenerDetallesPedidos,
    obtenerDetallePedidoPorProducto,
    obtenerDetallePedido,
    agregarDetallePedido,
    actualizarDetallePedido,
    eliminarDetallePedido,
  };
};