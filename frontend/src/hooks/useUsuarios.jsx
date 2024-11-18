import { useState, useEffect } from "react";
import { 
  obtenerUsuariosApi, 
  registrarUsuarioApi, 
  agregarUsuarioApi, 
  actualizarUsuarioApi, 
  eliminarUsuarioApi 
} from "../services/UserService";
import { obtenerMiUsuario } from "../services/AuthService";

export const useUsuarios = (refresh) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener todos los usuarios
  const obtenerUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerUsuariosApi();
      setUsuarios(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerUsuarioActual = async () => {
    setLoading(true);
    setError(null);
    try {
      const usuario = await obtenerMiUsuario();
      setUsuarioActual(usuario);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const registrarUsuario = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoUsuario = await registrarUsuarioApi(datos);
      setUsuarios([...usuarios, nuevoUsuario]); // Añadimos el nuevo usuario al array de usuarios
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un usuario con token
  const agregarUsuario = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoUsuario = await agregarUsuarioApi(datos);
      setUsuarios([...usuarios, nuevoUsuario]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar un usuario existente
  const actualizarUsuario = async (id, datos) => {
    setLoading(true);
    setError(null);
    try {
      const usuarioActualizado = await actualizarUsuarioApi(id, datos);
      setUsuarios(
        usuarios.map((usuario) => (usuario.id === id ? usuarioActualizado : usuario))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarUsuarioApi(id);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id)); // Quitamos el usuario eliminado
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ejecución automática al montar el componente para obtener usuarios
  useEffect(() => {
    obtenerUsuarios();
    obtenerUsuarioActual();
  }, [refresh]);

  return {
    usuarios,
    usuarioActual,
    loading,
    error,
    obtenerUsuarios,
    obtenerUsuarioActual,
    registrarUsuario,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
  };
};
