export const BASE_API = import.meta.env.VITE_API_URL;

export const setToken = (access, refresh) => {
  sessionStorage.setItem("accessToken", access);  // Guardar el token de acceso
  sessionStorage.setItem("refreshToken", refresh);  // Guardar el token de refresco
};

export const getToken = () => {
  return sessionStorage.getItem("accessToken");  // Obtener el token de acceso
};

export const getRefreshToken = () => {
  return sessionStorage.getItem("refreshToken");  // Obtener el token de refresco
};

export const removeToken = () => {
  sessionStorage.removeItem("accessToken");  // Eliminar el token de acceso
  sessionStorage.removeItem("refreshToken");  // Eliminar el token de refresco
};

export const ESTADO_PEDIDO = {
  PENDIENTE: "PENDIENTE",
  EN_PROCESO: "EN_PROCESO",
  COMPLETADO: "COMPLETADO",
}

export const ESTADO_PAGO = {
  PENDIENTE: "PENDIENTE",
  PAGADO: "PAGADO",
}