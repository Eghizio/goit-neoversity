import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const PUBLIC_DIRECTORY = join(__dirname, "public");
export const STATIC_DIRECTORY = join(__dirname, "uploads");
export const UPLOAD_DIRECTORY = join(__dirname, "uploads");

export const PORT = 3004;
