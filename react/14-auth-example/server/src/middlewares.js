import { JWT } from "./jwt.js";

export const logger = (req, res, next) => {
  const date = new Date().toISOString();
  const { method, path } = req;
  console.log(`${date} - [${method}] "${path}"`);
  next();
};

export const auth = (req, res, next) => {
  /* "Bearer TOKEN" */
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  // console.log({ token });

  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = JWT.verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};
