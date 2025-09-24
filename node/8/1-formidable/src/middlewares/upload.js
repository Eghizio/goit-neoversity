import formidable from "formidable";
import chalk from "chalk";
import { UPLOAD_DIRECTORY } from "../config.js";

const uploadConfig = {
  uploadDir: UPLOAD_DIRECTORY,
  keepExtensions: true,
  filename: (name, ext, part, form) => {
    //   console.log(part);

    const id = crypto.randomUUID();
    const ts = Date.now().toString();

    const fileName = `${name}_${ts}_${id}${ext}`;

    return fileName;
  },
  filter: ({ originalFilename, mimetype }) => {
    const isImage = mimetype?.includes("image");
    const isNotBanned = !originalFilename?.includes("monke");
    return isImage && isNotBanned;
  },
};

const progressPlugin = (self, options) => {
  self.on("progress", (bytesReceived, bytesExpected) => {
    const percentage = ((bytesReceived / bytesExpected) * 100).toFixed(0) + "%";
    const perc = percentage.padStart(4, " ");

    console.log(`Upload: ${chalk.bgYellow(perc)}`);
  });
};

export const upload = (req, res, next) => {
  const form = formidable(uploadConfig);

  form.use(progressPlugin);

  form.parse(req, (err, fields, files) => {
    if (err) return next(err);

    req.fields = fields;
    req.files = files;
    next();
  });
};
