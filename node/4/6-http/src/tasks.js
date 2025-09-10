/*
[
  { "id": "0", "text": "Learn HTML and CSS", "completed": true },
  { "id": "1", "text": "Get good at JavaScript", "completed": true },
  { "id": "2", "text": "Master React", "completed": false },
  { "id": "3", "text": "Discover Redux", "completed": false },
  { "id": "4", "text": "Build amazing apps", "completed": false },
  { "id": "5", "text": "Hello from Node.js 👋", "completed": false }
]
*/

import fs from "node:fs";

// const FILE_NAME = "tasks.json"; // Take __dirname into consideration. Use "path.join()".
const FILE_NAME = "./src/tasks.json";

export const Tasks = {
  __readTasks() {
    return JSON.parse(fs.readFileSync(FILE_NAME, { encoding: "utf8" }));
  },
  __writeTasks(tasks) {
    fs.writeFileSync(FILE_NAME, JSON.stringify(tasks, null, 2));
  },
  getAll() {
    return this.__readTasks();
  },
  getById(id) {
    const tasks = this.getAll();
    return tasks.find((task) => task.id === id);
  },
  getByStatus(isCompleted) {
    const tasks = this.getAll();
    return tasks.filter((task) => task.completed === isCompleted);
  },
  searchByText(text) {
    const tasks = this.getAll();
    const searchQuery = text.toLowerCase();
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(searchQuery)
    );
  },
  deleteById(id) {
    const tasks = this.getAll();
    const updatedTasks = tasks.filter((task) => task.id !== id);

    this.__writeTasks(updatedTasks);
  },
  add(text) {
    const task = { id: crypto.randomUUID(), text, completed: false };
    const tasks = this.getAll();
    tasks.push(task);

    this.__writeTasks(tasks);

    return task.id;
  },
  update(id, { text, completed }) {
    const tasks = this.getAll();
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            text: text ?? task.text,
            completed: completed ?? task.completed,
          }
        : task
    );

    this.__writeTasks(updatedTasks);
  },
};

// console.log(Tasks.getAll(), "\n");
// console.log(Tasks.getById("5"), "\n");
// console.log(Tasks.getByStatus(true), "\n");
// console.log(Tasks.getByStatus(false), "\n");
// console.log(Tasks.searchByText("amazing"), "\n");
// console.log(Tasks.searchByText("re"), "\n");

// console.log(Tasks.deleteById("0"), "\n");

// console.log(Tasks.add("Learn HTML and CSS"), "\n");

// console.log(
//   Tasks.update("1fc65c74-652b-4c07-b46c-4f8ebbba932d", { completed: true }),
//   "\n"
// );
