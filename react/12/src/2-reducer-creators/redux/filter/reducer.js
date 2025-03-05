import { createReducer } from "@reduxjs/toolkit";
import { filtersInitialState } from "./state";
import * as Actions from "./actions";

/* Previous */
// export const filtersReducer = (state = filtersInitialState, action) => {
//   switch (action.type) {
//     case Actions.setStatusFilter.type: {
//       return {
//         ...state,
//         status: action.payload,
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// };

/* Action.type get's extracted automatically. */
export const filtersReducer = createReducer(filtersInitialState, (builder) => {
  builder.addCase(Actions.setStatusFilter, (state, action) => {
    state.status = action.payload; /* Immer in action. */
  });
});
