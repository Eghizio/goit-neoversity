import chalk from "chalk";
import colors from "colors";

const msg = "Hello World!";

const colorFns = [chalk.red, chalk.blue, chalk.green, chalk.cyan, chalk.yellow];

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const coloured = msg
  .split("")
  .map((c, i) => colorFns[i % colorFns.length](c))
  // .map((c, i) => randomElement(colorFns)(c))
  .join("");

console.log(coloured);

console.log(chalk.bgWhiteBright(coloured));

console.log(chalk.bgBlueBright(coloured));

console.log(chalk.bgGreenBright(coloured));

console.log(colors.america("Fuck yeah!"));
