import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URL);

try {
  await sequelize.authenticate();
  console.log("Connection to the database has been established successfully");
} catch (e) {
  console.log("Unable to connect to the database: ", e);
}
