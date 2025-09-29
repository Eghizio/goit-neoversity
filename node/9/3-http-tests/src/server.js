const express = require("express");

const createServer = () => {
  const app = express();

  app.get("/user", (req, res) => res.status(200).json({ name: "Kuba" }));

  return app;
};

module.exports = { createServer };
