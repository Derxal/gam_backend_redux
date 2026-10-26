import { Router } from "express";
import { taskRepository } from "./taskRepository.js";

export const taskRouter = Router();

const isValidTitle = (title) => typeof title === "string" && title.trim() !== "";
const isValidCompleted = (completed) => typeof completed === "boolean";

const taskIdFrom = (req) => Number(req.params.id);

const notFound = (res) => res.status(404).json({ error: "Tarea no encontrada" });
const badRequest = (res, message) => res.status(400).json({ error: message });

// Un id que no es un entero no puede existir: se responde 404 sin consultar a MySQL
taskRouter.param("id", (req, res, next, id) => {
    if (!/^\d+$/.test(id)) return notFound(res);
    next();
});

taskRouter.get("/", async (req, res) => {
    res.json(await taskRepository.findAll());
});

taskRouter.get("/:id", async (req, res) => {
    const task = await taskRepository.findById(taskIdFrom(req));
    if (!task) return notFound(res);

    res.json(task);
});

taskRouter.post("/", async (req, res) => {
    const { title } = req.body ?? {};
    if (!isValidTitle(title)) return badRequest(res, "El título es obligatorio");

    const task = await taskRepository.create(title.trim());
    res.status(201).json(task);
});

taskRouter.put("/:id", async (req, res) => {
    const { title, completed } = req.body ?? {};
    if (!isValidTitle(title)) return badRequest(res, "El título es obligatorio");
    if (!isValidCompleted(completed)) return badRequest(res, "completed debe ser true o false");

    const task = await taskRepository.update(taskIdFrom(req), { title: title.trim(), completed });
    if (!task) return notFound(res);

    res.json(task);
});

taskRouter.delete("/:id", async (req, res) => {
    const task = await taskRepository.remove(taskIdFrom(req));
    if (!task) return notFound(res);

    res.json(task);
});
