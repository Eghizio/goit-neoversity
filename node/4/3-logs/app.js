import express from "express";
import morgan from "morgan";

import { createMorganLogger, LoggerMode } from "./logger.js";

const app = express();

const ourLogger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const date = new Date().toLocaleString();

  console.log(`[${method}] ${url} - ${date}`);
  next();
};

/* Custom console logger */
// app.use(ourLogger);

/* Logs are displayed in console */
// app.use(morgan("dev"));
// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));
/* Check ./logger.js for File and Rotating File logger with Morgan */

/* Abstracted */
// app.use(createMorganLogger());
// app.use(createMorganLogger(LoggerMode.CONSOLE));
// app.use(createMorganLogger(LoggerMode.FILE));
// app.use(createMorganLogger(LoggerMode.ROTATING_FILE));

app.get("/users", (req, res) => res.json({ users: ["Adam", "Beth", "Cecil"] }));
app.get("/redirect", (req, res) => res.redirect("/users"));
app.get("/nothing", (req, res) => res.sendStatus(404));
app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});

app.listen(3000, () => console.log("Listening on 3000..."));
