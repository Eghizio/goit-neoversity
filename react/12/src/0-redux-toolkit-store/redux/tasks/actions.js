import { action } from "../utils";
import * as ACTION_TYPE from "./actionTypes";

export const deleteTask = (taskId) => action(ACTION_TYPE.DELETE_TASK, taskId);

export const toggleCompleted = (taskId) =>
  action(ACTION_TYPE.TOGGLE_COMPLETED, taskId);

export const addTask = (text) =>
  action(ACTION_TYPE.ADD_TASK, {
    id: crypto.randomUUID(),
    completed: false,
    text,
  });
