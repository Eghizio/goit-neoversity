import express from "express";
import colors from "colors";

const app = express();

/* Middlewares */
const logger = (req, res, next) => {
  const { method, originalUrl } = req;

  const date = new Date().toLocaleString();
  console.log(colors.yellow(`[${date}] [${method}] - ${originalUrl}`));

  next();
};

const filterRequest = (req, res, next) => {
  if (req.originalUrl.startsWith("/sw.js")) {
    console.log(colors.red(`Request blocked - ${req.originalUrl}`));
    return res.status(404).end();
  }

  next();
};

let Visits = 0; /* Global variable - antipattern */
const simpleVisitsCounter = (req, res, next) => {
  Visits += 1;

  console.log(colors.magenta(`Visits: (${Visits})`));

  next();
};

const visitsUrlCounter = () => {
  const visits = {};

  return (req, res, next) => {
    const { originalUrl: url } = req;

    visits[url] = visits[url] ? ++visits[url] : 1;

    const msg = `URL Visits: (${visits[url]}) - ${url}`;
    console.log(colors.blue(msg));

    next();
  };
};

const withTimestampHeader = (req, res, next) => {
  const timestamp = Date.now();

  req.serverTimestamp = timestamp; /* Attaching data to request object */

  res.header("x-server-timestamp", timestamp);

  next();
};

/* Global Middlewares */
// app.use(logger);
// app.use(simpleVisitsCounter);

// app.use(visitsCounter);
// app.use(visitsUrlCounter());

// app.use(visitsUrlCounter());
// app.use(logger);

// app.use(logger, visitsUrlCounter());
app.use(filterRequest, logger, visitsUrlCounter());

/* Endpoints with inline Middlewares - route scoped */
app.get("/", simpleVisitsCounter, (request, response) => {
  return response.send("Hello there!");
});

app.get("/ping", withTimestampHeader, (request, response) => {
  const ts = request.serverTimestamp;
  console.log({ ts });

  response.send("Pong!");
});

app.get("/hi", simpleVisitsCounter, (request, response) => {
  return response.send("<h1 style='color:dodgerblue'>Hi!</h1>");
});

app.get("/visits", (request, response) => {
  return response.json({ Visits });
});

/* Not Found handler */
app.use((req, res) => {
  const notFoundMessage = "Ooopsie! You got lost? There is no such path!";

  return res
    .status(404)
    .send(`<h1 style='color:crimson'>${notFoundMessage}</h1>`);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(colors.cyan(`[server] Server running on port ${PORT}`));
});
