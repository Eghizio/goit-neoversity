import express from "express";
import cors from "cors";
import { auth, logger } from "./middlewares.js";
import { TasksRouter } from "./api/tasks.js";
import { UserRouter } from "./api/user.js";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/api/v1/tasks", auth, TasksRouter);
app.use("/api/v1/users", UserRouter);

app.listen(PORT, () => {
  const startTime = new Date().toISOString();
  console.log(`Hello from Server 👋`);
  console.log(`[${startTime}] Listening on http://localhost:${PORT}`);
});
