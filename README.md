# API de Servicios - DataPro Ecuador

API REST hecha con Node.js y Express. CRUD completo (GET, POST, PUT, DELETE).
Los datos se guardan en memoria (no hay base de datos).

## Cómo ejecutarla

Requiere Node.js 18 o superior (`node -v` para comprobarlo).

```bash
npm install     # solo la primera vez: instala Express
npm start       # inicia la API en http://localhost:3001
```

Debe aparecer: `API escuchando en http://localhost:3001`

- Para detenerla: `Ctrl + C`
- Mientras pruebas con Postman, la terminal debe quedar abierta.
- `npm run dev` hace lo mismo pero se reinicia solo al guardar cambios.

## Endpoints

| Método | Ruta                  | Qué hace        | Éxito | Errores  |
| ------ | --------------------- | --------------- | ----- | -------- |
| GET    | `/api/servicios`      | Lista todos     | 200   |          |
| GET    | `/api/servicios/:id`  | Obtiene uno     | 200   | 404      |
| POST   | `/api/servicios`      | Crea uno nuevo  | 201   | 400      |
| PUT    | `/api/servicios/:id`  | Actualiza uno   | 200   | 400, 404 |
| DELETE | `/api/servicios/:id`  | Elimina uno     | 200   | 404      |

Cuerpo JSON para POST y PUT:

```json
{
  "titulo": "Capacitación en Power BI",
  "descripcion": "Talleres prácticos para que tu equipo aprenda a crear reportes."
}
```

Reglas: `titulo` de 3 a 60 caracteres; `descripcion` de 10 a 200 caracteres.

## Postman

En Postman: Import → seleccionar `postman/DataPro-API.postman_collection.json`.
Trae 7 peticiones listas (los 4 métodos, un 404 y un 400).

## Estructura

```
api-servicios/
├── index.js                      # crea el servidor y lo inicia
├── routes/servicios.routes.js    # los 5 endpoints y los datos en memoria
├── postman/                      # colección para importar
└── package.json
```
