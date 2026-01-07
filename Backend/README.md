# Nexus Verium Backend

Este microservicio escucha en el puerto `4000` (por defecto) y expone endpoints para recibir los datos que se envían desde el formulario de contacto.

## Comandos útiles

- `npm install`: instala dependencias (`express`, `cors`, `nodemon`).
- `npm start`: arranca el servidor en modo producción.
- `npm run dev`: arranca el servidor con `nodemon` para desarrollo y recarga automática.

## Endpoints disponibles

- `GET /health`: responde con el estado del servicio.
- `GET /api/contact`: devuelve las últimas solicitudes recibidas (almacenadas en memoria).
- `POST /api/contact`: acepta un body JSON con `name`, `email`, `phone`, `company`, `message` y responde con el registro creado. `name`, `email` y `message` son obligatorios.

## CORS

El servidor está configurado para aceptar peticiones desde `http://localhost:3000`, que corresponde al front-end.
