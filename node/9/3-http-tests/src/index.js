const { createServer } = require("./server.js");

const CYAN = "\x1b[35m%s\x1b[0m";

const main = async (config) => {
  const app = createServer();

  return app.listen(config.port, () =>
    console.log(CYAN, `Listening on port ${config.port}`)
  );
};

const config = { port: 3003 };

main(config).catch(console.error);
