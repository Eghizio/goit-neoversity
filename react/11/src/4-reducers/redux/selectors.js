import { useSelector } from "react-redux";

export const useTasksSelector = () => useSelector((state) => state.tasks);

export const useFilterStatusSelector = () =>
  useSelector((state) => state.filters.status);
