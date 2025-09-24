import fs from "node:fs/promises";
import path from "node:path";

import express from "express";
import morgan from "morgan";
import chalk from "chalk";

import { upload } from "./middlewares/upload.js";
import { initDirectory, sleep } from "./utils.js";
import {
  PUBLIC_DIRECTORY,
  IMAGES_DIRECTORY,
  UPLOAD_DIRECTORY,
  PORT,
} from "./config.js";

const app = express();

app.use(morgan("dev"));
app.use(express.static(PUBLIC_DIRECTORY));
app.use("/images", express.static(IMAGES_DIRECTORY));

app.post("/upload", upload.single("picture"), async (req, res) => {
  if (!req.file?.originalname) {
    // return res.sendStatus(400);
    return res.status(400).json({ message: "Invalid file" });
  }

  const originalName = req.file.originalname;

  console.log(chalk.blueBright(`Uploading ${originalName} ...`));

  // const id = crypto.randomUUID();
  // const targetName = `${Date.now()}_${id}_${originalName}`;
  const targetName = `${Date.now()}_${originalName}`;

  const targetFileName = path.join(IMAGES_DIRECTORY, targetName);

  try {
    /* simulate processing file */
    await sleep(4_000);

    /* move to permament bucket storage */
    await fs.rename(req.file.path, targetFileName);
  } catch (error) {
    /* cleanup of temp directory on failure */
    await fs.unlink(req.file.path);
    return res.sendStatus(500);
  }

  return res.status(302).redirect("/");
});

app.get("/api/images", async (req, res) => {
  const imageFilenames = await fs.readdir(IMAGES_DIRECTORY);
  const images = imageFilenames.map((filename) => "/images/" + filename);

  return res.json({ images });
});

app.listen(PORT, async () => {
  await initDirectory(UPLOAD_DIRECTORY);
  await initDirectory(IMAGES_DIRECTORY);

  console.log(chalk.cyan(`[server] ${new Date().toISOString()}`));
  console.log(chalk.cyan(`[server] Server running on port ${PORT}`));
});
