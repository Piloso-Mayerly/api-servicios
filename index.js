// Punto de entrada de la API: crea el servidor y lo pone a escuchar.
import express from "express";
import serviciosRoutes from "./routes/servicios.routes.js";

const app = express();
const PUERTO = 3001;

// Middleware: convierte el JSON que envía el cliente (Postman) en el objeto req.body
app.use(express.json());

// Ruta de bienvenida: sirve para comprobar que la API está viva
app.get("/", (req, res) => {
    res.json({ mensaje: "API de DataPro Ecuador funcionando", rutas: "/api/servicios" });
});

// Todas las rutas de servicios empiezan con /api/servicios
app.use("/api/servicios", serviciosRoutes);

// Si ninguna ruta coincidió, la dirección no existe
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Si algo falla (por ejemplo, un JSON mal escrito en Postman) se responde con un error claro
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (err.status === 400) {
        return res.status(400).json({ mensaje: "El JSON enviado está mal escrito" });
    }
    console.error(err);
    res.status(500).json({ mensaje: "Error interno del servidor" });
});

app.listen(PUERTO, () => {
    console.log(`API escuchando en http://localhost:${PUERTO}`);
});
