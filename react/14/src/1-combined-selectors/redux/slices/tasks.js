import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks,
  addTask,
  deleteTask,
  toggleCompleted,
} from "../operations/tasks";

const onPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const onError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const tasksSlice = createSlice({
  name: "tasks",

  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, onPending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, onError)

      .addCase(addTask.pending, onPending)
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, onError)

      .addCase(deleteTask.pending, onPending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteTask.rejected, onError)

      .addCase(toggleCompleted.pending, onPending)
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addCase(toggleCompleted.rejected, onError);
  },

  // Rename get -> select.
  selectors: {
    selectTasks: (state) => state.items,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});

export const { selectTasks, selectIsLoading, selectError } =
  tasksSlice.selectors;

export const tasksReducer = tasksSlice.reducer;
