import * as Colors from "./colors.js";

const Logger = {
  async log(message) {
    console.log(Colors.Green, message);
  },

  async error(message) {
    console.error(Colors.Red, message);
  },

  async warn(message) {
    console.warn(Colors.Yellow, message);
  },

  async info(message) {
    console.info(Colors.Cyan, message);
  },
};

export default Logger;
