import { tasksInitialState } from "./state";
import * as ACTION_TYPE from "./actionTypes";

export const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TASK: {
      return [...state, action.payload];
    }

    case ACTION_TYPE.DELETE_TASK: {
      return state.filter((task) => task.id !== action.payload);
    }

    case ACTION_TYPE.TOGGLE_COMPLETED: {
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
