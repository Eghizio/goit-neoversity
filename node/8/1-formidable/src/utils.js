import fs from "node:fs/promises";
import chalk from "chalk";

const isAccessible = (dir) =>
  fs
    .access(dir)
    .then(() => true)
    .catch(() => false);

export const initDirectory = async (dir) => {
  if (await isAccessible(dir)) {
    return console.log(chalk.magenta(`Directory '${dir}' already exists.`));
  }

  console.log(chalk.magenta(`Initializing directory '${dir}'...`));
  await fs.mkdir(dir);
};

export const getFilenames = async (dir) => fs.readdir(dir);
