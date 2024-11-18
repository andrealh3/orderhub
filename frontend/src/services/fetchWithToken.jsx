import { getRefreshToken, getToken, setToken } from "../utils/constants";
import { refreshToken } from "./AuthService";

// Función para manejar el fetch y refrescar el token si ha expirado
export const fetchWithToken = async (url, options = {}) => {
  const token = getToken();

  // Añadir el token a las cabeceras
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    let response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      // Si es 401, intenta refrescar el token
      try {
        const refresh = getRefreshToken();
        const { access } = await refreshToken(refresh);

        if (!access) {
          throw new Error("No se pudo refrescar el token");
        }

        setToken(access, refresh);

        // Reintentar la solicitud original con el nuevo token
        const newHeaders = {
          ...headers,
          Authorization: `Bearer ${access}`,
        };

        response = await fetch(url, { ...options, headers: newHeaders });
      } catch (refreshError) {
        throw new Error("No se pudo refrescar el token o realizar la solicitud");
      }
    }

    return response; // Retornar la respuesta, ya sea inicial o la reintentada
  } catch (error) {
    throw new error; // Lanzar el error si ocurre
  }
};
