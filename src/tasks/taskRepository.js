import { database } from "../database.js";

const toTask = (row) => (row ? { ...row, completed: Boolean(row.completed) } : undefined);

const findAll = async () => {
    const [rows] = await database.execute("SELECT * FROM tasks ORDER BY id");
    return rows.map(toTask);
};

const findById = async (id) => {
    const [rows] = await database.execute("SELECT * FROM tasks WHERE id = ?", [id]);
    return toTask(rows[0]);
};

// MySQL no tiene RETURNING: después de escribir se vuelve a leer la tarea
const create = async (title) => {
    const [result] = await database.execute("INSERT INTO tasks (title) VALUES (?)", [title]);
    return findById(result.insertId);
};

const update = async (id, { title, completed }) => {
    await database.execute("UPDATE tasks SET title = ?, completed = ? WHERE id = ?", [title, Number(completed), id]);
    return findById(id);
};

const remove = async (id) => {
    const task = await findById(id);
    if (task) await database.execute("DELETE FROM tasks WHERE id = ?", [id]);
    return task;
};

export const taskRepository = { findAll, findById, create, update, remove };
