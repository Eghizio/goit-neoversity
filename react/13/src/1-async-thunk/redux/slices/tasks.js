import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../operations/tasks";

export const tasksSlice = createSlice({
  name: "tasks",

  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },

  selectors: {
    getTasks: (state) => state,
  },
});

// export const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;

/* We don't need these actions anymore. */
// export const { fetchingInProgress, fetchingSuccess, fetchingError } =
//   tasksSlice.actions;

export const { getTasks } = tasksSlice.selectors;

export const tasksReducer = tasksSlice.reducer;
