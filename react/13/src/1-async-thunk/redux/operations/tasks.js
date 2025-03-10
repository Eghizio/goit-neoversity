import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
// } from "../slices/tasks";
/* Not needed anymore */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getAllTasks = async () => {
  await sleep(2_500);
  if (Math.random() < 0.5) throw new Error("Ooopsie");

  const url = `${import.meta.env["VITE_API_URL"]}/tasks`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkApi) =>
    getAllTasks().catch((error) => thunkApi.rejectWithValue(error.message))
);
