import { filtersInitialState } from "./state";
import * as ACTION_TYPE from "./actionTypes";

export const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_STATUS_FILTER: {
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
