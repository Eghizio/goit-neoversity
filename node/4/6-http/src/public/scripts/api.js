const get = (endpoint) =>
  fetch(`/api/v1${endpoint}`)
    .then((res) => res.json())
    .catch(console.error);

export const TasksApi = {
  getAll: () => get("/tasks"),
};
