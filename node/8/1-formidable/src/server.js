import express from "express";
import chalk from "chalk";
import {
  PORT,
  UPLOAD_DIRECTORY,
  STATIC_DIRECTORY,
  PUBLIC_DIRECTORY,
} from "./config.js";
import { getFilenames, initDirectory } from "./utils.js";
import { upload } from "./middlewares/upload.js";

const app = express();

app.use("/", express.static(PUBLIC_DIRECTORY));
app.use("/static", express.static(STATIC_DIRECTORY));

app.post("/upload", upload, (req, res) => {
  const fields = req?.fields;
  const files = req?.files;

  return res.json({ fields, files });
});

app.get("/images", async (req, res) => {
  const uploads = await getFilenames(UPLOAD_DIRECTORY);

  const q = (req.query?.["search"] ?? "").toLowerCase();
  const searchResults = uploads.filter((name) =>
    name.toLowerCase().includes(q)
  );

  const imgs = searchResults.map((filename) => {
    const src = `/static/${filename}`;
    const name = filename?.split(".")?.shift();

    return `
    <article>
      <h2>${name}</h2>
      <img src="${src}" alt="${name}" title="${filename}"/>
    </article>`;
  });

  const html = `
    <link rel="stylesheet" href="/style.css">
    <header>
      <h1>Found ${searchResults.length} images</h1>
    </header>
    ${imgs.join("\n")}
  `;

  return res.send(html);
});

app.listen(PORT, async () => {
  await initDirectory(UPLOAD_DIRECTORY);

  console.log(chalk.cyan(`[server] ${new Date().toISOString()}`));
  console.log(chalk.cyan(`[server] Server running on port ${PORT}`));
});
