import { BASE_API, getToken} from "../utils/constants";

export const obtenerUsuarios = () => {
  const token = getToken();
  const url = `${BASE_API}/usuario/`;
  const parametros = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, parametros)
    .then(respuesta => respuesta.json())
    .catch(error => {
      throw error;
    });
};

export const registrarUsuario = (datos) => {
  const url = `${BASE_API}/usuario/`;
  const parametros = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  return fetch(url, parametros)
    .then(respuesta => {
      if (!respuesta.ok) {
        return respuesta.json().then(errorData => {
          throw new Error(errorData.detail || 'Error al crear usuario');
        });
      }
      return respuesta.json();
    })
    .catch(error => {
      throw error;
    });
};

export const agregarUsuario = (datos) => {
  const token = getToken();
  const url = `${BASE_API}/usuario/`;
  const parametros = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  return fetch(url, parametros)
    .then(respuesta => {
      if (!respuesta.ok) {
        return respuesta.json().then(errorData => {
          throw new Error(errorData.detail || 'Error al crear usuario');
        });
      }
      return respuesta.json();
    })
    .catch(error => {
      throw error;
    });
};


export const actualizarUsuario = (id, datos) => {
  const token = getToken();
  const url = `${BASE_API}/usuario/${id}/`;
  const parametros = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  return fetch(url, parametros)
    .then(respuesta => respuesta.json())
    .catch(error => {
      throw error;
    });
};


export const eliminarUsuarioApi = (id) => {
  const token = getToken();
  const url = `${BASE_API}/usuario/${id}/`;
  const parametros = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, parametros)
    .then(respuesta => {
      if (respuesta.status === 204) {
        return {};  // Sin contenido, usuario eliminado
      }
      return respuesta.json();
    })
    .catch(error => {
      throw error;
    });
};









// import { BASE_API, getToken } from "../utils/constants";

// /**
//  * Obtiene la lista de usuarios.
//  */
// export const obtenerUsuarios = async () => {
//   const token = getToken();
//   const url = `${BASE_API}/usuario/`;
//   const parametros = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     const respuesta = await fetch(url, parametros);
//     if (!respuesta.ok) {
//       throw new Error('Error al obtener usuarios');
//     }
//     return await respuesta.json();
//   } catch (error) {
//     console.error('Error al obtener usuarios:', error);
//     throw error;
//   }
// };

// /**
//  * Registra un nuevo usuario.
//  */
// export const registrarUsuario = async (datos) => {
//   const url = `${BASE_API}/usuario/`;
//   const parametros = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(datos),
//   };

//   try {
//     const respuesta = await fetch(url, parametros);
//     if (!respuesta.ok) {
//       const errorData = await respuesta.json();
//       throw new Error(errorData.detail || 'Error al crear usuario');
//     }
//     return await respuesta.json();
//   } catch (error) {
//     console.error('Error al agregar usuario:', error);
//     throw error;
//   }
// };

// /**
//  * Agrega un nuevo usuario al sistema.
//  */
// export const agregarUsuario = async (datos) => {
//   const token = getToken();
//   const url = `${BASE_API}/usuario/`;
//   const parametros = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(datos),
//   };

//   try {
//     const respuesta = await fetch(url, parametros);
//     if (!respuesta.ok) {
//       const errorData = await respuesta.json();
//       throw new Error(errorData.detail || 'Error al crear usuario');
//     }
//     return await respuesta.json();
//   } catch (error) {
//     console.error('Error al agregar usuario:', error);
//     throw error;
//   }
// };

// /**
//  * Actualiza la información de un usuario existente.
//  */
// export const actualizarUsuario = async (id, datos) => {
//   const token = getToken();
//   const url = `${BASE_API}/usuario/${id}/`;
//   const parametros = {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(datos),
//   };

//   try {
//     const respuesta = await fetch(url, parametros);
//     if (!respuesta.ok) {
//       throw new Error('Error al actualizar usuario');
//     }
//     return await respuesta.json();
//   } catch (error) {
//     console.error('Error al actualizar usuario:', error);
//     throw error;
//   }
// };

// /**
//  * Elimina un usuario del sistema.
//  */
// export const eliminarUsuarioApi = async (id) => {
//   const token = getToken();
//   const url = `${BASE_API}/usuario/${id}/`;
//   const parametros = {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     const respuesta = await fetch(url, parametros);
//     if (respuesta.status === 204) {
//       return {};  // Sin contenido, usuario eliminado
//     }
//     return await respuesta.json();
//   } catch (error) {
//     console.error('Error al eliminar usuario:', error);
//     throw error;
//   }
// };