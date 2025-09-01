const Red = "\x1b[31m%s\x1b[0m";
const Green = "\x1b[32m%s\x1b[0m";
const Yellow = "\x1b[33m%s\x1b[0m";
const Cyan = "\x1b[36m%s\x1b[0m";

const Logger = {
  log(message) {
    console.log(Green, message);
  },

  error(message) {
    console.error(Red, message);
  },

  warn(message) {
    console.warn(Yellow, message);
  },

  info(message) {
    console.info(Cyan, message);
  },
};

module.exports = Logger;
