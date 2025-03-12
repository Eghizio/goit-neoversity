import { combineReducers } from "redux";
import { tasksReducer } from "./slices/tasks";
import { filtersReducer } from "./slices/filter";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
