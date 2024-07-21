# Instrucciones para ejecutar la aplicación usando Docker
Este README proporciona instrucciones paso a paso para configurar y ejecutar una aplicación utilizando Docker. 
La aplicación está contenida en un contenedor Docker para facilitar su desarrollo.

## Requisitos previos
Asegúrese de tener Docker instalado en su sistema. Puede descargar e instalar Docker desde el sitio oficial 
de Docker.

## Configuración
- Descargue el repositorio: Descargue este repositorio en su máquina local utilizando el zip:
- Acceder al directorio del proyecto: Navegue al directorio del proyecto descargado:
    cd OrderHub
- Para que la aplicacion que quieres utilizar se ejecute correctamente primero cambia el nombre del archivo '.env ejemplo' por .env y segundo cambia el valor de las variables del fichero por las que corresponde para que la aplicacion vaya correctamente.

## Ejecutar la aplicación
### Uso del Makefile y Docker Compose
Este proyecto proporciona un Makefile para simplificar la administración de la aplicación utilizando Docker Compose. A continuación, se detallan los comandos disponibles y su funcionalidad:

### Comandos disponibles en el Makefile
- **arrancar**: Inicia la aplicación. Esto incluye la instalación de dependencias para el frontend, seguido por la construcción y ejecución de los contenedores de Docker usando Docker Compose.
- **bajar**: Detiene y elimina los contenedores de Docker en ejecución.
- **migrarbd**: Ejecuta las migraciones de la base de datos. Este comando utiliza Docker para ejecutar los comandos de migración de Django en el contenedor del backend.
- **terminalbackend**: Abre una terminal interactiva en el contenedor del backend.
- **terminalfrontend**: Abre una terminal interactiva en el contenedor del frontend.
- **terminalpostgres**: Abre una terminal interactiva en el contenedor de la base de datos PostgreSQL.
- **help**: Muestra una lista de los comandos disponibles y su funcionalidad.

### Uso de los comandos
Para utilizar los comandos disponibles, simplemente ejecuta make seguido del nombre del comando en tu terminal. 
- `make arrancar`: Esto instalará las dependencias del frontend, construirá y ejecutará los contenedores de Docker.
- `make bajar`: Esto detendrá y eliminará los contenedores de Docker en ejecución.
- `make migrarbd`: Esto ejecutará las migraciones de la base de datos utilizando Docker.
- `make terminalbackend`: Esto abrirá una terminal interactiva en el contenedor del backend.
- `make terminalfrontend`: Esto abrirá una terminal interactiva en el contenedor del frontend.
- `make terminalpostgres`: Esto abrirá una terminal interactiva en el contenedor de PostgreSQL.
- `make help`: Esto mostrará esta ayuda con los comandos disponibles y su funcionalidad.

## Acceder a la aplicación
Después de ejecutar el contenedor Docker, puede acceder al backend de la aplicación a través de un navegador web visitando http://localhost:8000, donde 8000 es el puerto que especificó al ejecutar el contenedor. Y uede acceder al frontend de la aplicación a través de un navegador web visitando http://localhost:3000, donde 3000 es el puerto que especificó al ejecutar el contenedor.