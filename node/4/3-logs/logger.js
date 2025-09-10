import fs from "node:fs";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));

import morgan from "morgan";
import * as rfs from "rotating-file-stream";

export const LoggerMode = Object.freeze({
  CONSOLE: "CONSOLE",
  FILE: "FILE",
  ROTATING_FILE: "ROTATING_FILE",
});

export const createMorganLogger = (mode = LoggerMode.CONSOLE) => {
  switch (mode) {
    case LoggerMode.FILE: {
      const accessLogStream = fs.createWriteStream(
        join(__dirname, "access.log"),
        { flags: "a" }
      );
      return morgan("combined", { stream: accessLogStream });
    }

    case LoggerMode.ROTATING_FILE: {
      const rotatingAccessLogStream = rfs.createStream(createRotatingFileName, {
        interval: "1m",
        path: join(__dirname, "logs"),
      });
      return morgan("combined", { stream: rotatingAccessLogStream });
    }

    case LoggerMode.CONSOLE:
    default:
      return morgan("dev");
  }
};

const createRotatingFileName = (time, index) => {
  console.log({ time, index });

  if (!time) return `${Date.now()}_access.log`;

  const timestamp = new Date(time).toISOString().replaceAll(":", "_");

  return `${timestamp}_${index}_access.log`;
};
