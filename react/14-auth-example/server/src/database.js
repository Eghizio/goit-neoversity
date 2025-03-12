const tasks = [
  { id: "0", userId: "0", text: "Learn HTML and CSS", completed: true },
  { id: "1", userId: "0", text: "Get good at JavaScript", completed: true },
  { id: "2", userId: "0", text: "Master React", completed: false },
  { id: "3", userId: "0", text: "Discover Redux", completed: false },
  { id: "4", userId: "0", text: "Build amazing apps", completed: false },
  { id: "5", userId: "0", text: "Hello from Server 👋", completed: false },
  {
    id: "6",
    userId: "1",
    text: "This belongs to some other user 🔐",
    completed: false,
  },
];

// We would hash password in real case scenario.
const users = [
  { id: "0", name: "John Doe", email: "kuba@koduj.se", password: "kuba123" },
];

export const database = {
  getAllTasks: async (userId) => tasks.filter((task) => task.userId === userId),

  addTask: async (userId, text) => {
    const newTask = { id: crypto.randomUUID(), userId, text, completed: false };
    tasks.push(newTask);

    console.log("Added:", newTask);

    return newTask;
  },

  deleteTask: async (userId, taskId) => {
    const index = tasks.findIndex(
      (task) => task.id === taskId && task.userId === userId
    );
    if (index !== -1) tasks.splice(index, 1);

    console.log("Deleted:", taskId);

    return taskId;
  },

  toggleTask: async (userId, task) => {
    const updatedTask = { ...task, completed: !task.completed };
    const index = tasks.findIndex(
      (t) => t.id === task.id && t.userId === userId
    );
    if (index !== -1) tasks[index] = { ...updatedTask, userId };

    console.log("Updated:", updatedTask);

    return updatedTask;
  },

  registerUser: async (email, password) => {
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const newUser = { id: crypto.randomUUID(), email, password };
    users.push(newUser);

    const { password: _, ...sanitizedUser } = newUser;

    return sanitizedUser;
  },

  loginUser: async (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const { password: _, ...sanitizedUser } = user;

    return sanitizedUser;
  },

  getUser: async (userId) => {
    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const { password: _, ...sanitizedUser } = user;

    return sanitizedUser;
  },
};
