const Logger = require("./Logger.js");
const { add, subtract, multiply, divide } = require("./math.js");
// const Math = require("./math.js");

Logger.log(add(40, 2));

Logger.error(subtract(44, 2));

Logger.warn(multiply(2, 1));

Logger.info(divide(3, 7));
