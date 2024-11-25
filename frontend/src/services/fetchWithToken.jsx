import { getRefreshToken, getToken, setToken } from "../utils/constants";
import { refreshToken } from "./AuthService";

export const fetchWithToken = async (url, options = {}) => {
  let token = getToken();

  if (!token) {
    throw new Error("No se encontró un token válido.");
  }
  
  // Verificar si el token ha expirado
  if (isTokenExpired(token)) {
    try {
      const refresh = getRefreshToken();
      if (!refresh) {
        throw new Error("No se encontró el token de refresco.");
      }

      const { access } = await refreshToken(refresh);

      if (!access) {
        throw new Error("No se pudo obtener un nuevo token de acceso.");
      }

      // Actualizar el token y usar el nuevo
      setToken(access, refresh);
      token = access;
    } catch (error) {
      console.error("Error al refrescar el token:", error);

      // Manejo específico de error por token inválido
      if (error.message.includes("Error al refrescar el token")) {
        throw new Error("Token de refresco inválido o expirado.");
      }

      throw error;
    }
  }

  // Configurar las cabeceras con el token válido
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    // Realizar la solicitud
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      throw new Error("Token inválido o no autorizado.");
    }

    return response; // Retornar la respuesta si fue exitosa
  } catch (error) {
    console.error("Error durante la solicitud:", error);
    throw error; // Lanzar el error si ocurre
  }
};

// Función para verificar si un token JWT ha expirado
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el payload
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return payload.exp < currentTime; // Comparar con el tiempo de expiración
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return true; // Si ocurre un error, asumir que el token está expirado
  }
};