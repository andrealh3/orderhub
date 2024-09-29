# Ejecutar la aplicación

Este README proporciona instrucciones paso a paso para configurar y ejecutar una aplicación utilizando Docker. 
La aplicación está contenida en un contenedor Docker para facilitar su desarrollo.

## Uso del Makefile y Docker Compose

Este proyecto proporciona un **Makefile** que simplifica la administración de la aplicación usando Docker Compose. Los comandos disponibles permiten realizar varias operaciones en el proyecto sin necesidad de escribir comandos largos de Docker manualmente.

## Comandos disponibles en el Makefile

- **`make arrancar`**: 
   - Instala las dependencias del frontend, construye y ejecuta los contenedores Docker usando Docker Compose.
   
- **`make bajar`**: 
   - Detiene y elimina los contenedores de Docker en ejecución.
   
- **`make migrarbd`**: 
   - Ejecuta las migraciones de la base de datos, usando Docker para ejecutar los comandos de migración de Django dentro del contenedor del backend.
   
- **`make terminalbackend`**: 
   - Abre una terminal interactiva en el contenedor del backend.
   
- **`make terminalfrontend`**: 
   - Abre una terminal interactiva en el contenedor del frontend.
   
- **`make terminalpostgres`**: 
   - Abre una terminal interactiva en el contenedor de la base de datos PostgreSQL.
   
- **`make help`**: 
   - Muestra una lista de todos los comandos disponibles en el Makefile y su funcionalidad.


---

## Uso de los comandos

1. **Iniciar la aplicación**:
   
   Para instalar las dependencias del frontend, construir y ejecutar los contenedores de Docker, usa el comando:
   
   ```bash
   make arrancar
   ```

2. **Detener y eliminar los contenedores**:

   Para detener los contenedores y eliminarlos, usa:
   
   ```bash
   make bajar
   ```

3. **Migrar la base de datos**:

   Para ejecutar las migraciones de la base de datos de Django:
   
   ```bash
   make migrarbd
   ```

4. **Abrir terminal en el contenedor del backend**:

   Para abrir una terminal interactiva dentro del contenedor del backend:
   
   ```bash
   make terminalbackend
   ```

5. **Abrir terminal en el contenedor del frontend**:

   Para abrir una terminal interactiva dentro del contenedor del frontend:
   
   ```bash
   make terminalfrontend
   ```

6. **Abrir terminal en el contenedor de PostgreSQL**:

   Para abrir una terminal interactiva dentro del contenedor de PostgreSQL:
   
   ```bash
   make terminalpostgres
   ```

7. **Mostrar la ayuda**:

   Si quieres ver todos los comandos disponibles en el Makefile:
   
   ```bash
   make help
   ```

---

## Acceder a la aplicación

Después de ejecutar los contenedores Docker, puedes acceder a los servicios de la aplicación desde tu navegador:

| Servicio        | Dominio                           |
|:---------------:|:---------------------------------:|
| Backend     | [http://localhost:8000](http://localhost:8000) |
| Frontend    | [http://localhost:3000](http://localhost:3000) |

> **Nota**: Asegúrate de que los puertos locales 8000 y 3000 estén disponibles cuando ejecutas los contenedores.