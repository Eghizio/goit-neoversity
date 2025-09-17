import { Op, QueryTypes, DataTypes } from "sequelize";
import { sequelize, User } from "./User.js";

const Log = (values) => console.log(values.map((v) => v.dataValues));

await User.sync({ force: true });
await User.destroy({ truncate: true });

/* Sorting */
await User.findAll({
  // order: [
  //   // ["name", "DESC"],
  //   // sequelize.fn("max", sequelize.col("points")),
  //   // ["createdAt", "DESC"],
  //   // ["createdAt"],
  // ],

  // order: sequelize.literal("max(points) DESC"),
  order: sequelize.random(),
}).then(Log);

/* Grouping */
await User.findAll({ group: "points" }).then(Log);

/* Limiting */
await User.findAll({ limit: 2 }).then(Log);
await User.findAll({ offset: 5 }).then(Log);
await User.findAll({ offset: 5, limit: 2 }).then(Log);

/* Counting & Aggregates */
const count = await User.count();
console.log({ count });

const proUsers = await User.count({
  where: { points: { [Op.gt]: 42 } },
});
console.log(`There are currently ${proUsers} users with score over 42.`);

await User.max("points").then(console.log);
await User.max("points", { where: { points: { [Op.lt]: 42 } } }).then(
  console.log
);

await User.min("points").then(console.log);
await User.min("points", { where: { points: { [Op.gt]: 30 } } }).then(
  console.log
);

await User.sum("points").then(console.log);
await User.sum("points", { where: { points: { [Op.gt]: 1000 } } }).then(
  console.log
);

/* Query one */
await User.findByPk(1).then(console.log);
await User.findOne({ where: { id: 1 } }).then(console.log);

const [user, created] = await User.findOrCreate({
  where: { name: "John" },
  defaults: {
    email: "johnny@mail.com",
    name: "John",
    nickname: "Johnny",
  },
});
console.log({ user, created });

/* Getters & Setters */
const Moderator = sequelize.define("moderator", {
  name: {
    type: DataTypes.STRING,
    get() {
      const name = this.getDataValue("name");
      return name.toUpperCase();
    },
  },
  age: {
    type: DataTypes.INTEGER,
    set(value) {
      if (value <= 0) throw new Error("Invalid age!");
      else this.setDataValue("age", value);
    },
  },
});

/* Validations & Constraints */
const Student = sequelize.define("student", {
  /* Constraint */
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  /* Validation */
  password: { type: DataTypes.STRING(64), is: /^[0-9a-f]{64}$/i },
  /* Mix */
  email: { type: DataTypes, isEmail: true, unique: true },
});

/* Raw Queries */
const [results, metadata] = await sequelize.query("SELECT * FROM users;");
console.log({ results, metadata });

const usrs = await sequelize.query("SELECT * FROM users;", {
  type: QueryTypes.SELECT,
});
console.log({ usrs });

const mapped_users = await sequelize.query("SELECT * FROM users;", {
  model: User,
  mapToModel: true,
});
Log(mapped_users);

const raw_users = await sequelize.query("SELECT * FROM users;", {
  type: QueryTypes.SELECT,
  raw: true,
});
console.log({ raw_users });
