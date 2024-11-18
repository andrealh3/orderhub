import { useState, useEffect } from "react";
import {
  obtenerProductosApi,
  agregarProductosApi,
  obtenerProductoApi,
  actualizarProductoApi,
  eliminarProductoApi,
} from "../services/ProductoService"; // Asegúrate de que la ruta sea correcta

export const useProductos = (refresh) => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los productos
  const obtenerProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerProductosApi();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener un producto por ID
  const obtenerProducto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerProductoApi(id);
      setProducto(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Agregar un nuevo producto
  const agregarProducto = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoProducto = await agregarProductosApi(datos);
      setProductos([...productos, nuevoProducto]); // Añadir el nuevo producto a la lista
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un producto
  const actualizarProducto = async (id, datos) => {
    setLoading(true);
    setError(null);
    try {
      const productoActualizado = await actualizarProductoApi(id, datos);
      setProductos((prevProductos) =>
        prevProductos.map((prod) => (prod.id === id ? productoActualizado : prod))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto
  const eliminarProducto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarProductoApi(id);
      setProductos((prevProductos) =>
        prevProductos.filter((prod) => prod.id !== id)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, [refresh]);

  // Al llamar a este hook, devolvemos las funciones y los estados
  return {
    productos,
    producto,
    loading,
    error,
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
  };
};
