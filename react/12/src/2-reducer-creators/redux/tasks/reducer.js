import { createReducer } from "@reduxjs/toolkit";
import { tasksInitialState } from "./state";
import * as Actions from "./actions";

/* Previous */
// export const tasksReducer = (state = tasksInitialState, action) => {
//   switch (action.type) {
//     case Actions.addTask.type: {
//       return [...state, action.payload];
//     }

//     case Actions.deleteTask.type: {
//       return state.filter((task) => task.id !== action.payload);
//     }

//     case Actions.toggleCompleted.type: {
//       return state.map((task) => {
//         if (task.id !== action.payload) {
//           return task;
//         }
//         return { ...task, completed: !task.completed };
//       });
//     }

//     default: {
//       return state;
//     }
//   }
// };

/* Action.type get's extracted automatically. */
export const tasksReducer = createReducer(tasksInitialState, (builder) => {
  builder
    .addCase(Actions.addTask, (state, action) => {
      state.push(action.payload); /* Immer in action. */

      return state; /* We can even return state. But with Immer we don't always have to. */
    })
    .addCase(Actions.deleteTask, (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1); /* Immer in action. */

      /* More concise. */
      // return state.filter(task => task.id !== action.payload);
    })
    .addCase(Actions.toggleCompleted, (state, action) => {
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed; /* Immer in action. */
        }
      }
    });
});
