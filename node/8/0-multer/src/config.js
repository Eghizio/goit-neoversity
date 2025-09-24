import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const PUBLIC_DIRECTORY = join(__dirname, "public");
export const UPLOAD_DIRECTORY = join(__dirname, "uploads");
export const IMAGES_DIRECTORY = join(__dirname, "images");

export const PORT = 3003;
