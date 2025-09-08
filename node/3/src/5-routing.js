import express from "express";
import colors from "colors";
import { apiRouter } from "./api/api.js";

const app = express();

// app.use("/api", apiRouter);
app.use("/api/v1", apiRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(colors.cyan(`[server] Server running on port ${PORT}`));
});
