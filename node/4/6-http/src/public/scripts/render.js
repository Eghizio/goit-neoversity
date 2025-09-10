export const renderTasks = (tasks) => {
  const items = tasks.map((task) => {
    const li = document.createElement("li");

    li.classList.add("task");
    if (task.completed) li.classList.add("completed");

    li.textContent = task.text;

    return li;
  });

  document.querySelector("#task-list").replaceChildren(...items);
};
