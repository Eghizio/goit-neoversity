import colors from "colors";

/* Command Line Arguments */
// console.log(process.argv);
// console.log(process.env);

// const args = process.argv.slice(2);
// console.log(args);

/* Parsing arguments */
// const getArg = (argName) =>
//   process.argv
//     .slice(2)
//     .find((arg) => arg.startsWith(`${argName}=`))
//     ?.slice(argName.length + 1);

// const color = getArg("color");
// const msg = getArg("msg");
// console.log({ color, msg });

const parseArgs = () =>
  process.argv.slice(2).reduce((allArguments, arg) => {
    if (!arg.includes("=")) return allArguments;

    const [key, value] = arg.split("=");
    return {
      ...allArguments,
      [key]: value,
    };
  }, {});

// const allCommandLineArguments = parseArgs();
// console.log(allCommandLineArguments);
// console.log(allCommandLineArguments.color);

/* Simple program with command line arguments */
const prettyPrint = (color, msg = "Please provide a msg argument") => {
  const coloringFunction = colors[color];

  const textToPrint = coloringFunction ? coloringFunction(msg) : msg;

  console.log("\n");
  console.log(textToPrint);
};

const args = parseArgs();
console.log(args);
prettyPrint(args.color, args.msg);
