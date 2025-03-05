import { tasksInitialState } from "./state";
import * as Actions from "./actions";

export const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case Actions.addTask.type: {
      return [...state, action.payload];
    }

    case Actions.deleteTask.type: {
      return state.filter((task) => task.id !== action.payload);
    }

    case Actions.toggleCompleted.type: {
      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    }

    default: {
      return state;
    }
  }
};
