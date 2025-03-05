import { combineReducers } from "redux";
import { tasksReducer } from "./tasks/reducer";
import { filtersReducer } from "./filter/reducer";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
