import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import chalk from "chalk";
import { config } from "./config.js";
import { createServer } from "./server/server.js";

const PUBLIC_DIRECTORY = join(
  dirname(fileURLToPath(import.meta.url)),
  "public"
);

const log = (msg) => console.log(chalk.green(msg));

const init = async (config) => {
  const port = config.PORT;

  const server = createServer(PUBLIC_DIRECTORY);

  server.listen(port, () => {
    log(`[server] ${new Date().toISOString()}`);
    log(`[server] Server is running on port ${port}`);
    log(chalk.underline(`[server] http://localhost:${port}`));
  });
};

init(config).catch(console.error);
