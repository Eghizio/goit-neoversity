import express from "express";
import morgan from "morgan";

const port = process.env.PORT || 3001;
const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World 👋"));
app.get("/api{/*endpoint}", (req, res) => res.json({ time: new Date() }));

app.listen(port, () =>
  console.log("\x1b[36m%s\x1b[0m", `Listening on port ${port}`)
);

/* Demo: Typo in Dockerfile CMD -> Fast rebuild thanks to caching. */
/* Demo: Show dockerized Database + Web GUI ex. PgAdmin, PHPMyAdmin, DBeaver, Redis Insight */

/* Homework: Explore Docker Compose & Docker Volumes (ex. with MongoDB) */
