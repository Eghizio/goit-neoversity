import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors()); // same as: app.use(cors("*")); /* Try to comment out this line. */

const whitelist = ["http://example1.com", "http://example2.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use("/", express.static("./public"));

app.get("/public", cors("*"), (req, res) => res.json({ msg: "Hello 👋" }));

const users = ["Adam", "Beth", "Cecil"];
app.get("/api/users", (req, res) => res.json({ users }));
const books = ["First", "Second", "Third"];
app.get("/api/books", (req, res) => res.json({ books }));

app.listen(3000, () => console.log(`Server listening on 3000...`));
