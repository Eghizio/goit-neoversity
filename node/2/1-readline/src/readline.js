import readline from "node:readline"; /* there is a readline/promises module available as well ;) */

const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();
console.log("Please write something...");

lineReader.question("What day of the month is it?\n", (answer) => {
  const msg = answer === "10" ? "It's raining money! 💸" : "Be frugal!";
  console.log(msg);

  console.log("\x1b[31m%s\x1b[0m", "\nUse Ctrl+C to exit.");
});

lineReader.on("line", (input) => {
  if (input === "exit") {
    console.log("Goodbye 👋");
    process.exit();
  }

  console.log("🤖 Your input = ", input);
});
