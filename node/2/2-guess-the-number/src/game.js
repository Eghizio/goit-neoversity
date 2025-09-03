import fs from "node:fs";
import readline from "node:readline";
import * as commander from "commander";
import colors from "colors";

const getResultsFileName = () => {
  commander.program.option(
    "-f, --file [type]",
    "File where we will save our game results",
    "saves/results.txt"
  );

  commander.program.parse(process.argv);

  return commander.program.opts().file;
};

const isNumber = (val) => typeof val === "number" && !isNaN(val);

const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();
console.log(colors.cyan("Please provide a number!"));

const MAX = 1_000;
const SECRET_NUMBER = Math.round(Math.random() * MAX);
const SAVE_FILE_NAME = getResultsFileName();

let tries = 0;

lineReader.on("line", (answer) => {
  // const guess = Number.parseInt(answer); // try 0xff ;)
  const guess = Number.parseInt(answer, 10);

  if (!isNumber(guess)) {
    return console.log(
      colors.red(`${answer} is not a number. Please provide a legit value...`)
    );
  }

  tries++;

  if (guess === SECRET_NUMBER) {
    console.log(
      colors.green(
        `Hooray! You've won! ${SECRET_NUMBER} was the secret number!`
      )
    );

    const msg = `You guessed after ${tries} tries!`;
    console.log(colors.rainbow(msg));

    fs.appendFileSync(SAVE_FILE_NAME, `${new Date().toISOString()} ${msg}\n`);

    process.exit();
  }

  if (guess < SECRET_NUMBER) console.log(colors.magenta("More"));
  if (guess > SECRET_NUMBER) console.log(colors.magenta("Less"));
});
