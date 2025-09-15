import { sequelize } from "./db.js";
import { User } from "./models/User.js";

// await User.drop();

/* https://sequelize.org/docs/v6/other-topics/migrations */
await User.sync({
  force: true,
});

/* Create */
const adam = User.build({ name: "Adam", email: "adam@mail.com" });
await adam.save();

const adam2 = await User.create({ name: "Adam", email: "adam2@mail.com" });
console.log(adam2.toJSON());
console.log(JSON.stringify(adam2, null, 2));

/* Read */
const users = await User.findAll();
console.log(users.map((u) => u.dataValues));

/* Update */
const beth = await User.create({ name: "Beth", email: "beth@mail.com" });
beth.name = "Bob";
await beth.save();
console.log("Beth.id:", beth.id);

/* Delete */
await beth.destroy();
await User.destroy({ where: { id: beth.id } });

/* Reload (reset) */
const cecil = await User.create({ name: "Cecil", email: "cecil@mail.com" });
cecil.name = "Chloe";
await cecil.reload();
console.log(cecil.name);

/* Saving specific fields */
const john = await User.create({ name: "John", email: "john@mail.com" });
john.name = "Bob";
john.favouriteColor = "blue";
await john.save({ fields: ["name"] });

await john.reload();
console.log(john.name);
console.log(john.favouriteColor);

/* Incrementation */
const bob = await User.create({
  name: "Bob",
  email: "bob@mail.com",
  age: 97,
  cash: 1000,
});
const incrementResult = await bob.increment("age", { by: 2 });
console.log(incrementResult);
const incrementResult2 = await bob.increment("age");
console.log(incrementResult2);

/* Incrementation - multiple fields */
await bob.increment({
  age: 2,
  cash: 500,
});
