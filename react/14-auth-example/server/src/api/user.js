import { Router } from "express";
import { database } from "../database.js";
import { JWT } from "../jwt.js";
import { auth } from "../middlewares.js";

export const UserRouter = Router();

UserRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await database.registerUser(email, password);

    const token = JWT.sign({ id: user.id });

    return res.json({ ...user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

UserRouter.post("/sessions", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await database.loginUser(email, password);

    const token = JWT.sign({ id: user.id });

    return res.json({ ...user, token });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

UserRouter.get("/sessions", auth, async (req, res) => {
  const user = req.user;

  try {
    const currentUser = await database.getUser(user?.id);
    return res.json(currentUser);
  } catch (errors) {
    return res.status(401).json({ error: errors.message });
  }
});

UserRouter.delete("/sessions", async (req, res) => {
  // destroy JWT

  return res.sendStatus(204);
});
