import { createSlice } from "@reduxjs/toolkit";
import { STATUS_FILTERS } from "../../constants/filter";

const filtersSlice = createSlice({
  name: "filters",

  initialState: {
    status: STATUS_FILTERS.ALL,
  },

  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
  },

  selectors: {
    getFilterStatus: (filters) => filters.status,
  },
});

export const { setStatusFilter } = filtersSlice.actions;

export const { getFilterStatus } = filtersSlice.selectors;

export const filtersReducer = filtersSlice.reducer;
