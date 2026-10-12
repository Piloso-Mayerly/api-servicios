
import { Router } from "express";

const router = Router();

// "Base de datos" en memoria: un arreglo. Si se reinicia el servidor, vuelve a estos datos.
let servicios = [
    {
        id: 1,
        titulo: "Análisis de datos",
        descripcion: "Transformamos datos en información útil para mejorar la toma de decisiones.",
    },
    {
        id: 2,
        titulo: "Dashboards",
        descripcion: "Creamos paneles visuales para consultar tus indicadores de manera sencilla.",
    },
    {
        id: 3,
        titulo: "Automatización de reportes",
        descripcion: "Automatizamos procesos para reducir tareas repetitivas y ahorrar tiempo.",
    },
];

// Contador para dar un id nuevo a cada servicio creado.
// No se usa servicios.length + 1 porque al eliminar se repetirían ids.
let siguienteId = 4;

// Revisa los datos que llegan en el cuerpo (body) y devuelve una lista de errores.
// Si la lista está vacía, los datos son válidos.
function validarServicio(datos) {
    const errores = [];
    const titulo = typeof datos.titulo === "string" ? datos.titulo.trim() : "";
    const descripcion = typeof datos.descripcion === "string" ? datos.descripcion.trim() : "";

    if (titulo.length < 3 || titulo.length > 60) {
        errores.push("titulo es obligatorio y debe tener entre 3 y 60 caracteres");
    }
    if (descripcion.length < 10 || descripcion.length > 200) {
        errores.push("descripcion es obligatoria y debe tener entre 10 y 200 caracteres");
    }

    return errores;
}

// GET /api/servicios  ->  todos los servicios
router.get("/", (req, res) => {
    res.status(200).json(servicios);
});

// GET /api/servicios/:id  ->  un servicio. ":id" es un parámetro de la URL
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const servicio = servicios.find((s) => s.id === id);

    if (!servicio) {
        return res.status(404).json({ mensaje: `No existe un servicio con id ${req.params.id}` });
    }

    res.status(200).json(servicio);
});

// POST /api/servicios  ->  crear un servicio nuevo con los datos del body
router.post("/", (req, res) => {
    const datos = req.body ?? {};
    const errores = validarServicio(datos);

    if (errores.length > 0) {
        return res.status(400).json({ mensaje: "Datos inválidos", errores });
    }

    const nuevo = {
        id: siguienteId++,
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim(),
    };
    servicios.push(nuevo);

    res.status(201).json(nuevo); // 201 = creado
});

// PUT /api/servicios/:id  ->  reemplazar los datos de un servicio existente
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const servicio = servicios.find((s) => s.id === id);

    if (!servicio) {
        return res.status(404).json({ mensaje: `No existe un servicio con id ${req.params.id}` });
    }

    const datos = req.body ?? {};
    const errores = validarServicio(datos);

    if (errores.length > 0) {
        return res.status(400).json({ mensaje: "Datos inválidos", errores });
    }

    servicio.titulo = datos.titulo.trim();
    servicio.descripcion = datos.descripcion.trim();

    res.status(200).json(servicio);
});

// DELETE /api/servicios/:id  ->  eliminar un servicio
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const servicio = servicios.find((s) => s.id === id);

    if (!servicio) {
        return res.status(404).json({ mensaje: `No existe un servicio con id ${req.params.id}` });
    }

    // Nos quedamos con todos los servicios MENOS el eliminado
    servicios = servicios.filter((s) => s.id !== id);

    res.status(200).json({ mensaje: "Servicio eliminado", servicio });
});

export default router;
