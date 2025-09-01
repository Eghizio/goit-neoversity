import fs from "node:fs";
import path from "node:path";
import fsPromises from "node:fs/promises";

const FILE_NAME = "io.json";
// const FILE_NAME = "secret_file";

const savedData = { secret: "abc" };

const serializeData = (data) => JSON.stringify(data, null, 2) + "\n";

/* [Sync API] */
/* Sync API - Write to file */
fs.writeFileSync(FILE_NAME, serializeData(savedData));
fs.writeFileSync(FILE_NAME, serializeData(savedData), { flag: "a" });

/* Sync API - Read from file */
const retrievedRawData = fs.readFileSync(FILE_NAME);
console.log("[raw] Data:\n", retrievedRawData); /* Buffer */
console.log("[raw] Type:\n", typeof retrievedRawData);
console.log("[raw] Data:\n", retrievedRawData.toString());

/* Sync API - Read from file with encoding */
const retrievedData = fs.readFileSync(FILE_NAME, { encoding: "utf-8" });
console.log("[utf] Data:\n", retrievedData);
console.log("[utf] Type:\n", typeof retrievedData);

/* Sync API - Parse retrieved data */
console.log("[utf] secret:", retrievedData.secret);

const parsedData = JSON.parse(retrievedData);
console.log("[utf] Parsed Data:", parsedData);
console.log("[utf] Parsed secret:", parsedData.secret);

/* [Async API] */
/* Async API - Write to file */
await fsPromises.writeFile(FILE_NAME, serializeData(savedData), { flag: "a" });

/* Async API - Read from file with encoding */
const contents = await fsPromises.readFile(FILE_NAME, { encoding: "utf-8" });
console.log(contents);

/* Print current directory of executing the script */
console.log("Current Working Directory:\n", process.cwd());

/* Scan folder */
const printDirectory = async (directoryName) => {
  const files = await fsPromises.readdir(directoryName);

  const stats = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directoryName, file);

      const { size, mtime } = await fsPromises.stat(filePath);

      return {
        name: file,
        size,
        date: mtime,
      };
    })
  );

  console.log(directoryName);
  console.table(stats);
};

printDirectory("../0-node-npm");
printDirectory("../1-modules");
printDirectory("../2-filesystem");
/* printDirectory("."); */

printDirectory("../0-node-npm/node_modules");
