import { Tasks } from "./tasks/tasks.js";
import { Command } from "commander";
import colors from "colors";

const parseArguments = () => {
  const program = new Command();

  program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "task id")
    .option("-t, --text <type>", "task text")
    .option("-c, --completed <type>", "task completion status");

  program.parse(process.argv);

  const argv = program.opts();

  return argv;
};

const invokeAction = ({ action, id, text, completed }) => {
  switch (action) {
    case "list":
      console.log(Tasks.getAll());
      break;

    case "getById":
      if (id) {
        console.log(colors.green(Tasks.getById(id)));
      } else {
        console.log(colors.red("Please provide a task id."));
      }
      break;

    case "getByStatus":
      if (completed) {
        const isCompleted = completed === "true";
        console.log(colors.green(Tasks.getByStatus(isCompleted)));
      } else {
        console.log(colors.red("Please provide a task completion status."));
      }
      break;

    case "add":
      if (text) {
        const id = Tasks.add(text);
        console.log(colors.green(`Task added successfully. ID: ${id}`));
      } else {
        console.log(colors.red("Please provide a task text."));
      }
      break;

    case "remove":
      if (id) {
        Tasks.deleteById(id);
        console.log(colors.green(`Task removed successfully.`));
      } else {
        console.log(colors.red("Please provide a task id."));
      }
      break;

    default:
      console.warn(colors.red("Unknown action type!"));
  }
};

const main = () => {
  const argv = parseArguments();

  invokeAction(argv);
};

// Run the program.
main();
