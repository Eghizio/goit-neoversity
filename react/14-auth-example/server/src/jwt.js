import jwt from "jsonwebtoken";

const JWT_SECRET = "jwt-super-secret"; // This should be in .env

export const JWT = {
  sign: (payload) => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;
    return jwt.sign({ ...payload, exp }, JWT_SECRET);
  },
  verify: (token) => {
    return jwt.verify(token, JWT_SECRET);
  },
};
