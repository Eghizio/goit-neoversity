/* https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color */

const FgBlack = "\x1b[30m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[36m";
const FgWhite = "\x1b[37m";
const FgGray = "\x1b[90m";
const Reset = "\x1b[0m";

export enum Colors {
  Black = `${FgBlack}%s${Reset}`,
  Red = `${FgRed}%s${Reset}`,
  Green = `${FgGreen}%s${Reset}`,
  Yellow = `${FgYellow}%s${Reset}`,
  Blue = `${FgBlue}%s${Reset}`,
  Magenta = `${FgMagenta}%s${Reset}`,
  Cyan = `${FgCyan}%s${Reset}`,
  White = `${FgWhite}%s${Reset}`,
  Gray = `${FgGray}%s${Reset}`,
}
