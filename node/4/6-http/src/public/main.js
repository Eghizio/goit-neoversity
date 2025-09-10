import { TasksApi } from "./scripts/api.js";
import { renderTasks } from "./scripts/render.js";

TasksApi.getAll().then(renderTasks);
