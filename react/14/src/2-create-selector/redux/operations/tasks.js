import { createAsyncThunk } from "@reduxjs/toolkit";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const request = async (endpoint, options = {}) => {
  await sleep(2_500);
  if (Math.random() < 0.05) throw new Error("Ooopsie");

  const url = `${import.meta.env["VITE_API_URL"]}${endpoint}`;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkApi) =>
    request("/tasks").catch((error) => thunkApi.rejectWithValue(error.message))
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, thunkAPI) =>
    request("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) =>
    request(`/tasks/${taskId}`, { method: "DELETE" }).catch((error) =>
      thunkAPI.rejectWithValue(error.message)
    )
);

export const toggleCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async (task, thunkAPI) =>
    request(`/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    }).catch((error) => thunkAPI.rejectWithValue(error.message))
);
