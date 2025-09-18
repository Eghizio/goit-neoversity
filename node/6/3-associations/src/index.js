import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DB_URL);

/* One to One & One to Many */
const Project = sequelize.define("project", {
  title: DataTypes.STRING,
});

const Task = sequelize.define("task", {
  title: DataTypes.STRING,
});

Project.hasMany(Task, { onDelete: "CASCADE", hooks: true });

Task.belongsTo(Project);
