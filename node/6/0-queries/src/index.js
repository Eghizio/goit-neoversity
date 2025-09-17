import { Op } from "sequelize";
import { InitUsers, sequelize, User } from "./User.js";

const Log = (result) => console.log(result.map((r) => r.dataValues));

await User.sync({ force: true });
// await User.destroy({ truncate: true });
await InitUsers().then(Log);

/* Insertion */
const john = await User.create({
  email: "john@mail.com",
  name: "John",
});
console.log({ john });

const user = await User.create(
  {
    email: "user@mail.com",
    name: "User",
    nickname: "usr",
    is_admin: true,
  },
  {
    fields: ["email", "name", "is_admin"],
  }
);
console.log("user:", user.dataValues);
console.log("nickname:", user.nickname);
console.log("is_admin:", user.is_admin);

/* Queries */
const firstUser = await User.findOne();
console.log({ firstUser });

const allUsers = await User.findAll();
Log(allUsers);

await User.findAll({
  attributes: ["email", ["is_admin", "hasAdminPrivileges"]],
}).then(Log);

await User.findAll({
  attributes: [sequelize.fn("COUNT", sequelize.col("points"))],
}).then(Log);

await User.findAll({
  attributes: {
    exclude: [
      "name",
      "email",
      "is_admin",
      "last_login",
      "createdAt",
      "updatedAt",
    ],
  },
}).then(Log);

/* WHERE */
await User.findAll({ where: { id: 2 } }).then(Log);

await User.findAll({
  where: {
    id: {
      [Op.eq]: 2,
    },
  },
}).then(Log);

/* AND */
await User.findAll({
  where: {
    // id: 1,
    // name: "Adam",
    nickname: null,
    is_admin: false,
  },
}).then(Log);

await User.findAll({
  where: {
    [Op.and]: [{ id: 1 }, { name: "Adam" }],
  },
}).then(Log);

/* OR */
await User.findAll({
  where: {
    [Op.or]: [{ id: 1 }, { id: 2 }],
  },
}).then(Log);

await User.findAll({
  where: {
    id: {
      [Op.or]: [1, 2] /* IN */,
    },
  },
}).then(Log);

/* Operators */
await User.findAll({
  where: {
    [Op.and]: [{ a: 1, b: 2 }], // (a = 1) AND (b = 2)
    [Op.or]: [{ a: 1, b: 2 }], // (a = 1) OR (b = 2)
    someAttr: {
      // Basic comparisons
      [Op.eq]: 3, // = 3
      [Op.ne]: 4, // != 4
      [Op.is]: null, // IS NULL
      [Op.not]: true, // IS NOT TRUE
      [Op.or]: [5, 6], // (someAttr = 5) OR (someAttr = 6)

      // Numeric comparisons
      [Op.gt]: 6, // > 6
      [Op.gte]: 6, // >= 6
      [Op.lt]: 7, // < 7
      [Op.lte]: 7, // <= 7
      [Op.between]: [8, 10], // BETWEEN 8 AND 10
      [Op.notBetween]: [8, 10], // NOT BETWEEN 8 AND 10

      // Other comparisons
      [Op.all]: sequelize.literal("SELECT 1"), // > ALL (SELECT 1)
      [Op.in]: [10, 12], // IN [10, 12]
      [Op.notIn]: [10, 12], // NOT IN [10, 12]

      [Op.like]: "%foo", // LIKE '%foo'
      [Op.notLike]: "%foo", // NOT LIKE '%foo'
      [Op.startsWith]: "foo", // LIKE 'foo%'
      [Op.endsWith]: "foo", // LIKE '%foo'
      [Op.substring]: "foo", // LIKE '%foo%'

      [Op.iLike]: "%foo", // ILIKE '%foo' (PostgreSQL only, case-insensitive)
      [Op.notILike]: "%foo", // NOT ILIKE '%foo'

      [Op.regexp]: "^[b|a|r]", // REGEXP '~' (MySQL/PostgreSQL)
      [Op.notRegexp]: "^[b|a|r]", // NOT REGEXP '!' (MySQL/PostgreSQL)
      [Op.iRegexp]: "^[b|a|r]", // Case-insensitive regexp '~*' (PostgreSQL only)
      [Op.notIRegexp]: "^[b|a|r]", // NOT '~*' (PostgreSQL only)

      // And more...
    },
  },
});

await User.findAll({
  where: {
    points: {
      [Op.or]: {
        [Op.gte]: 1000,
        [Op.eq]: 42,
      },
    },
    createdAt: {
      [Op.lt]: new Date(),
      [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1_000),
    },
  },
}).then(Log);

await User.findAll({
  where: {
    [Op.or]: [
      sequelize.where(sequelize.fn("char_length", sequelize.col("name")), 4),
      {
        points: {
          [Op.lt]: 42,
        },
      },
    ],
  },
}).then(Log);

/* Operating on instance */
await User.update({ name: "Johnny" }, { where: { id: 1 } });

await User.destroy({ where: { id: 1 } });

await User.bulkCreate([
  { email: "john42@mail.com", name: "John" },
  { email: "jane@mail.com", name: "Jane" },
]).then(Log);
