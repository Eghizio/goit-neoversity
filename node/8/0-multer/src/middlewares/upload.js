import multer from "multer";
import { nanoid } from "nanoid";
import { UPLOAD_DIRECTORY } from "../config.js";

const storage = multer.diskStorage({
  destination: UPLOAD_DIRECTORY,
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const id = nanoid();
    const fileName = [timestamp, id, file.originalname].join("_");

    console.log(`Uploading "${fileName}"`);

    callback(null, fileName);
  },
  limits: { fileSize: 1_000_000 },
});

const fileFilter = (req, file, callback) => {
  const isForbiddenFile = !file.originalname.includes("monke");

  callback(null, isForbiddenFile);
  // callback(null, !isForbiddenFile);
};

export const upload = multer({ storage, fileFilter });
