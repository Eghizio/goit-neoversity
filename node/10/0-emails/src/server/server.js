import express from "express";
import morgan from "morgan";
import { api } from "./api.js";

export const createServer = (publicDirectory) => {
  const app = express();

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.static(publicDirectory));

  app.use("/api/v1/", api);

  return app;
};
