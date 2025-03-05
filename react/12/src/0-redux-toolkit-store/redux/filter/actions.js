import { action } from "../utils";
import * as ACTION_TYPE from "./actionTypes";

export const setStatusFilter = (filterStatus) =>
  action(ACTION_TYPE.SET_STATUS_FILTER, filterStatus);
