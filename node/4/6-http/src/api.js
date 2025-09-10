import { Router } from "express";
import { Tasks } from "./tasks.js";

export const ApiRouter = Router();

ApiRouter.get("/tasks", (req, res) => {
  const tasks = Tasks.getAll();

  return res.json(tasks);
});

ApiRouter.post("/tasks", (req, res) => {
  const body = req.body;
  const taskId = Tasks.add(body.text);

  return res.status(201).json({ id: taskId });
});

ApiRouter.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  Tasks.deleteById(id);

  return res.sendStatus(204);
});

ApiRouter.patch("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Tasks.update(id, body);

  return res.sendStatus(200);
});
