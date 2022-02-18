# API REST

## Tecnologías requeridas

- Node.js v16.13.1 - Entorno de ejecución de JavaScript.
- npm v8.1.2 - Gestor de paquetes para node.js

Las siguientes dependencias se instalaron con npm:

- Express.js v4.17.2 - Framework para el desarrollo de aplicaciones web en Node.js
- Yup v0.27.0 - Validación de datos
- cors v2.8.5 - habilitar CORS en el servidor
- dotenv v10.0.0 - Carga de variables de entorno
- mysql v2.18.1 - MySQL
- sql-injection v0.0.7 - Prevención de SQL Injection

## Organización

```
backend/
├──helper/    funciones de ayuda para operaciones en backend
├──routes/    rutas de la API REST separado por recurso
├──validations/    ciertas validaciones para los datos de entrada de la API REST
├──.env.example   archivo plantilla para cargar variables de configuración
├──db-connection.js   conexión a la base de datos
├──index.js   archivo principal de la API REST
└──package.json   archivo de configuración de la API REST
```

## Documentación de la API (SWAGGER)

Para ver la documentación de la api, pueden dirigirse a la ruta /api-docs con el proyecto en ejecución

[Ver en la App en producción](https://bsale-store-xsr.herokuapp.com/api-docs)
