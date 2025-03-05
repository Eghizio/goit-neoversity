import { combineReducers } from "redux";
import { tasksReducer } from "./tasks/reducer";
import { filtersReducer } from "./filter/reducer";

// export const rootReducer = (state = {}, action) => {
//   return {
//     tasks: tasksReducer(state.tasks, action),
//     filters: filtersReducer(state.filters, action),
//   };
// };

/* Better */
export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
