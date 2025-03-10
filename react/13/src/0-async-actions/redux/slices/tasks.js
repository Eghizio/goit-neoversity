import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",

  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    fetchingInProgress(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

  selectors: {
    getTasks: (state) => state,
  },
});

// export const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;
export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  tasksSlice.actions;

export const { getTasks } = tasksSlice.selectors;

export const tasksReducer = tasksSlice.reducer;
