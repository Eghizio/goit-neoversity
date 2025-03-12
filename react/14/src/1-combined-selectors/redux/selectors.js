import { STATUS_FILTERS } from "../constants/filter";

const selectTasks = (state) => state.tasks.items;
const selectStatusFilter = (state) => state.filters.status;

export const selectVisibleTasks = (state) => {
  const tasks = selectTasks(state);
  const statusFilter = selectStatusFilter(state);

  switch (statusFilter) {
    case STATUS_FILTERS.ACTIVE: {
      return tasks.filter((task) => !task.completed);
    }

    case STATUS_FILTERS.COMPLETED: {
      return tasks.filter((task) => task.completed);
    }

    case STATUS_FILTERS.ALL:
    default: {
      return tasks;
    }
  }
};

export const selectTaskCount = (state) => {
  const tasks = selectTasks(state);

  console.log("running selectTaskCount");

  return tasks.reduce(
    (acc, task) => {
      const key = task.completed ? "completed" : "active";
      acc[key] += 1;
      return acc;
    },
    { active: 0, completed: 0 }
  );
};
