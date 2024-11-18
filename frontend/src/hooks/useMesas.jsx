import { useState, useEffect, useCallback } from "react";
import { 
  obtenerMesasApi, 
  agregarMesasApi, 
  obtenerMesaApi, 
  actualizarMesasApi, 
  eliminarMesaApi
} from "../services/MesaService";

export const useMesas = (refresh) => {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener todas las mesas
  const obtenerMesas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerMesasApi();
      setMesas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener una mesa por id
  const obtenerMesa = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerMesaApi(id);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar una nueva mesa
  const agregarMesa = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      const nuevaMesa = await agregarMesasApi(datos);
      setMesas([...mesas, nuevaMesa]); // Actualiza el estado con la nueva mesa
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar una mesa
  const actualizarMesa = async (id, datos) => {
    setLoading(true);
    setError(null);
    try {
      const mesaActualizada = await actualizarMesasApi(id, datos);
      setMesas(
        mesas.map((mesa) => (mesa.id === id ? mesaActualizada : mesa)) // Actualiza la mesa en el estado
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una mesa
  const eliminarMesa = async (numero) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarMesaApi(numero);
      setMesas(mesas.filter((mesa) => mesa.numero !== numero)); // Elimina la mesa del estado
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerMesas(); // Llamada inicial para obtener las mesas cuando el hook es montado
  }, [refresh]);

  return {
    mesas,
    loading,
    error,
    obtenerMesas,
    obtenerMesa,
    agregarMesa,
    actualizarMesa,
    eliminarMesa,
  };
};
