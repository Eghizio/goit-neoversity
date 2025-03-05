import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",

  initialState: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],

  reducers: {
    addTask: {
      prepare(text) {
        return {
          payload: { id: crypto.randomUUID(), completed: false, text },
        };
      },
      reducer(state, action) {
        state.push(action.payload);
        return state;
      },
    },
    deleteTask(state, action) {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleCompleted(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          break;
        }
      }
      return state;
    },
  },

  selectors: {
    getTasks: (tasks) => tasks,
  },
});

export const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;

export const { getTasks } = tasksSlice.selectors;

export const tasksReducer = tasksSlice.reducer;
