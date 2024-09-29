# Proyecto Orderhub

Este es el repositorio del proyecto **Orderhub**, el cual está desplegado en varios servicios de producción y puede ser configurado localmente para desarrollo utilizando Docker.

---

## Dominios de los servicios de producción

Puedes acceder a los servicios de la aplicación en producción en estos enlaces:

| Servicios       | Dominio                           |
|:---------------:|:---------------------------------:|
| Backend     | [https://orderhub-c5ab90f90cdb.herokuapp.com](https://orderhub-c5ab90f90cdb.herokuapp.com)|
| Frontend    | [https://orderhub.vercel.app](https://orderhub.vercel.app) |

---

## Instrucciones para ejecutar la aplicación en local usando Docker

### Requisitos previos

Antes de comenzar, asegúrate de tener Docker instalado en tu sistema:

- [Descargar Docker](https://www.docker.com/get-started)
  
> **Nota**: Si no tienes Docker instalado, visita el [sitio oficial de Docker](https://www.docker.com/get-started) para descargarlo e instalarlo.

---

### Pasos para configurar el entorno de desarrollo

Sigue los pasos a continuación para poder probar el proyecto dockerizado en tu máquina local:

1. **Descargar el repositorio**:

   Descarga el repositorio en tu máquina local usando la opción de descargar como `.zip` o clonándolo con Git:
   
   ```bash
   git clone https://github.com/usuario/orderhub.git
   ```

2. **Acceder al directorio del proyecto**:

    Navega al directorio del proyecto descargado:

    ```bash
    cd OrderHub
    ```

3. **Configurar las variables de entorno**:

   - Cambia el nombre del archivo `.env ejemplo` a `.env`:
     
     ```bash
     mv .env\ ejemplo .env
     ```
   - Edita el archivo `.env` con las variables de entorno que correspondan a tu configuración local.

---

### Ejecutar la aplicación

Sigue las instrucciones detalladas en este [enlace](docker.md) ejecutar la aplicación.