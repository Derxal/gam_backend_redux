import { database } from "../database.js";

const toTask = (row) => (row ? { ...row, completed: Boolean(row.completed) } : undefined);

const findAll = () =>
    database.prepare("SELECT * FROM tasks ORDER BY id").all().map(toTask);

const findById = (id) =>
    toTask(database.prepare("SELECT * FROM tasks WHERE id = ?").get(id));

const create = (title) =>
    toTask(database.prepare("INSERT INTO tasks (title) VALUES (?) RETURNING *").get(title));

const update = (id, { title, completed }) =>
    toTask(database.prepare("UPDATE tasks SET title = ?, completed = ? WHERE id = ? RETURNING *").get(title, Number(completed), id));

const remove = (id) =>
    toTask(database.prepare("DELETE FROM tasks WHERE id = ? RETURNING *").get(id));

export const taskRepository = { findAll, findById, create, update, remove };
