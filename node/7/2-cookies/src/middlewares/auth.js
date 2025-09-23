// import passport from "passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT } from "../lib/jwt.js";
import { Users, UserRole } from "../models/Users.js";
import { HttpError } from "../models/HttpError.js";
// import { config } from "../Config.js";

/* Passport middleware */
// const strategyOptions = {
//   secretOrKey: config.JWT_SECRET,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// };

// passport.use(
//   new Strategy(strategyOptions, (payload, done) => {
//     Users.findById(payload?.data?.id)
//       .then((user) =>
//         !user ? done(new Error("User not existing")) : done(null, user)
//       )
//       .catch(done);
//   })
// );

// export const auth =
//   (roles = [UserRole.USER, UserRole.ADMIN]) =>
//   (req, res, next) =>
//     passport.authenticate("jwt", { session: false }, (error, user) => {
//       if (!user || error || !roles.includes(user?.role)) {
//         // return res.status(401).json({ message: "Unauthorized bro!" });
//         return next(new HttpError(403, "Unauthorized bro!"));
//       }
//       req.userId = user._id;
//       next();
//     })(req, res, next);

export const auth =
  (roles = [UserRole.USER, UserRole.ADMIN]) =>
  async (req, res, next) => {
    /* Auth Header */
    // const authtoken = req.headers["authorization"];
    /* Auth Cookie */
    const authtoken = req.cookies["authorization"];

    const token = authtoken?.replace("Bearer ", "");

    const isTokenValid = await JWT.verify(token);
    if (!isTokenValid) {
      // return res.status(401).json({ error: "Invalid token." });
      return next(new HttpError(401, "Invalid token."));
    }

    const tokenData = JWT.decode(token);
    if (!tokenData?.data) {
      // return res.status(401).json({ error: "Malformed token." });
      return next(new HttpError(401, "Malformed token."));
    }

    const user = await Users.findById(tokenData?.data?.id);

    if (!user || !roles.includes(user?.role)) {
      // return res.status(403).json({ error: "Unauthorized." });
      return next(new HttpError(403, "Unauthorized."));
    }

    req.userId = user._id;

    next();
  };
