import { createAction } from "@reduxjs/toolkit";
/* `actionTypes.js` removed - not needed anymore */

export const deleteTask = createAction("tasks/deleteTask");

export const toggleCompleted = createAction("tasks/toggleCompleted");

export const addTask = createAction("tasks/addTask", (text) => ({
  payload: { id: crypto.randomUUID(), completed: false, text },
}));
