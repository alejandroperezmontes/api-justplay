# api-justplay

App desarrollada para la prueba tecnica de JustPlay

## Estructura del proyecto

### scr/controllers

Contiene todos los contradolores, uno por modelo.

### src/middleware

Contiene funciones generales, y validaciones. Antes de cada endpoint se usa para validar también en el server.

### src/models

Contiene la estructura de los modelos, cada archivo es un modelo. Para este caso Game.

### src/routes

Contiene las rutas del proyecto, hace uso de los middlewares y del controlador correspondiente.

### sql

Aqui esta el SQL para crear la base de datos y la tabla creada en un diagrama sencillo.