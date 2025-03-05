import { filtersInitialState } from "./state";
import * as Actions from "./actions";

export const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case Actions.setStatusFilter.type: {
      return {
        ...state,
        status: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
