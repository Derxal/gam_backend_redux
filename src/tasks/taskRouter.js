import { Router } from "express";
import { taskRepository } from "./taskRepository.js";

export const taskRouter = Router();

const isValidTitle = (title) => typeof title === "string" && title.trim() !== "";
const isValidCompleted = (completed) => typeof completed === "boolean";

const taskIdFrom = (req) => Number(req.params.id);

const notFound = (res) => res.status(404).json({ error: "Tarea no encontrada" });
const badRequest = (res, message) => res.status(400).json({ error: message });

taskRouter.get("/", (req, res) => {
    res.json(taskRepository.findAll());
});

taskRouter.get("/:id", (req, res) => {
    const task = taskRepository.findById(taskIdFrom(req));
    if (!task) return notFound(res);

    res.json(task);
});

taskRouter.post("/", (req, res) => {
    const { title } = req.body ?? {};
    if (!isValidTitle(title)) return badRequest(res, "El título es obligatorio");

    const task = taskRepository.create(title.trim());
    res.status(201).json(task);
});

taskRouter.put("/:id", (req, res) => {
    const { title, completed } = req.body ?? {};
    if (!isValidTitle(title)) return badRequest(res, "El título es obligatorio");
    if (!isValidCompleted(completed)) return badRequest(res, "completed debe ser true o false");

    const task = taskRepository.update(taskIdFrom(req), { title: title.trim(), completed });
    if (!task) return notFound(res);

    res.json(task);
});

taskRouter.delete("/:id", (req, res) => {
    const task = taskRepository.remove(taskIdFrom(req));
    if (!task) return notFound(res);

    res.json(task);
});
