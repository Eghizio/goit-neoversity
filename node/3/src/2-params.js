import express from "express";
import colors from "colors";

const app = express();

const users = ["Adam", "Beth", "Cecil"];
const getUserById = (id) => users?.[id] ?? null;

app.get("/users", (req, res) => res.json(users));

app.get("/users/:id/", (req, res) => {
  /* ID 1.15 -> JSON {} */
  // const userId = Number(req.params.id);

  /* ID 1.15 -> JSON { name: "Beth" } */
  // const userId = parseInt(req.params.id); /* Could be Hex or Binary */
  const userId = parseInt(req.params.id, 10);

  console.log(`Trying to get user with id: ${userId}`);

  if (Number.isNaN(userId)) return res.sendStatus(400);

  const requestedUser = getUserById(userId);
  if (!requestedUser) return res.sendStatus(404);

  const responseBody = { name: requestedUser };

  console.log(JSON.stringify(responseBody));

  return res.json(responseBody);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(colors.cyan(`[server] Server running on port ${PORT}`));
});
