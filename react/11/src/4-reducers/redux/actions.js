const action = (type, payload) => ({ type, payload });

export const deleteTask = (taskId) => action("tasks/deleteTask", taskId);

export const toggleCompleted = (taskId) =>
  action("tasks/toggleCompleted", taskId);

export const setStatusFilter = (filterStatus) =>
  action("filters/setStatusFilter", filterStatus);

export const addTask = (text) =>
  action("tasks/addTask", {
    id: crypto.randomUUID(),
    completed: false,
    text,
  });
