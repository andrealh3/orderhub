import { getRefreshToken, getToken, setToken } from "../utils/constants";
import { refreshToken } from "./AuthService";

// Función para manejar el fetch y refrescar el token si ha expirado
export const fetchWithToken = async (url, options = {}) => {
  const token = getToken();

  // Añadir el token a las cabeceras si no está ya
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  // Realizar la solicitud con el token actual
  try {
    let response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      // Si es 401, intenta refrescar el token
      const refresh = getRefreshToken();
      const { access } = await refreshToken(refresh);

      if (!access) {
        throw new Error("No se pudo refrescar el token");
      }

      setToken(access, refresh);

      // Actualizar el token en las cabeceras
      const newHeaders = {
        ...(options.headers || {}),
        Authorization: `Bearer ${access}`,
      };

      // Reintentar la solicitud original con el nuevo token
      response = await fetch(url, { ...options, headers: newHeaders });
    }

    return response; // Retornar la respuesta, ya sea inicial o la reintentada
  } catch (error) {
    throw error; // Lanzar el error si ocurre
  }
};