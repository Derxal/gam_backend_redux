import express from "express";
import cors from "cors";
import { taskRouter } from "./tasks/taskRouter.js";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRouter);

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
