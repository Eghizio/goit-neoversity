import { Router } from "express";
import { database } from "../database.js";

export const TasksRouter = Router();

TasksRouter.get("/", async (req, res) => {
  const user = req.user;

  const tasks = await database.getAllTasks(user?.id);

  return res.json(tasks);
});

TasksRouter.post("/", async (req, res) => {
  const user = req.user;

  const { text } = req.body;

  const task = await database.addTask(user?.id, text);

  return res.status(201).json(task);
});

TasksRouter.delete("/:id", async (req, res) => {
  const user = req.user;

  const id = req.params.id;
  const taskId = await database.deleteTask(user?.id, id);

  return res.status(204).send();
});

TasksRouter.put("/:id", async (req, res) => {
  const user = req.user;

  const id = req.params.id;
  const { text, completed } = req.body;

  const task = await database.toggleTask(user?.id, { id, text, completed });

  return res.json(task);
});
