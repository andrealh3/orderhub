import { useState, useEffect } from "react";
import { 
  obtenerCategoriasApi, 
  agregarCategoriasApi, 
  obtenerCategoriaApi, 
  actualizarCategoriasApi, 
  eliminarCategoriaApi, 
  tieneProductosEnCategoriaApi
} from "../services/CategoriaService";

export const useCategorias = ( refresh ) => {
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las categorías
  const obtenerCategorias = async () => {
    setLoading(true);
    try {
      const data = await obtenerCategoriasApi();
      setCategorias(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener una categoría específica
  const obtenerCategoria = async (id) => {
    setLoading(true);
    try {
      const data = await obtenerCategoriaApi(id);
      setCategoria(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Agregar una nueva categoría
  const agregarCategoria = async (nuevaCategoria) => {
    setLoading(true);
    try {
      const data = await agregarCategoriasApi(nuevaCategoria);
      setCategorias([...categorias, data]); // Actualiza la lista de categorías
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar una categoría
  const actualizarCategoria = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const data = await actualizarCategoriasApi(id, datosActualizados);
      // Actualiza la categoría en la lista
      setCategorias(categorias.map(categoria => 
        categoria.id === id ? data : categoria
      ));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una categoría
  const eliminarCategoria = async (id) => {
    setLoading(true);
    try {
      const tieneProductos = await tieneProductosEnCategoria(id);
      if (tieneProductos) {
        throw new Error("No se puede eliminar la categoría porque contiene productos.");
      }

      await eliminarCategoriaApi(id);
      setCategorias(categorias.filter(categoria => categoria.id !== id)); // Remueve la categoría eliminada
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const tieneProductosEnCategoria = async (id) => {
    setLoading(true);
    try {
      const tieneProductos = await tieneProductosEnCategoriaApi(id);
      return tieneProductos; // Devuelve el resultado para usarlo
    } catch (error) {
      setError(error.message);
      return false; // En caso de error, retornar false
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar las categorías cuando el hook se monta
  useEffect(() => {
    obtenerCategorias();
  }, [refresh]);

  return {
    categorias,
    categoria,
    loading,
    error,
    obtenerCategorias,
    obtenerCategoria,
    agregarCategoria,
    actualizarCategoria,
    eliminarCategoria,
    tieneProductosEnCategoria
  };
};
