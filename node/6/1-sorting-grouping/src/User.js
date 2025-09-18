import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URL);

export const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    last_login: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: true }
);

const e = (n) => `${n.toLowerCase()}@mail.com`;
const u = (name, values = {}) => ({ ...values, name, email: e(name) });

export const InitUsers = () =>
  User.bulkCreate([
    u("Adam", { nickname: "Dadaś", points: 101, is_admin: true }),
    u("Beth", { nickname: "Beti" }),
    u("Cecil", { points: 42, is_admin: true }),
    u("Darek", { points: 9001 }),
    u("Emil", { points: 500 }),
    u("Fiona", { points: 400 }),
    u("Gerwazy", { nickname: "Gierek", points: 1337, is_admin: true }),
    u("Hania", { points: 1 }),
    u("Ilona", { points: 15 }),
    u("Jakub", { nickname: "Kuba", points: 99, is_admin: true }),
  ]);

/*
INSERT INTO users (email, name, nickname, is_admin, points, last_login, "createdAt", "updatedAt") VALUES
    ('adam@mail.com', 'Adam', 'Dadaś', true, 101, now(), now(), now()),
    ('beth@mail.com', 'Beth', 'Beti', false, 0, now(), now(), now()),
    ('cecil@mail.com', 'Cecil', null, true, 42, now(), now(), now()),
    ('darryl@mail.com', 'Darryl', null, false, 9001, now(), now(), now()),
    ('emil@mail.com', 'Emil', null, false, 500, now(), now(), now()),
    ('fiona@mail.com', 'Fiona', null, false, 400, now(), now(), now()),
    ('gerwazy@mail.com', 'Gerwazy', 'Gierek', true, 1337, now(), now(), now()),
    ('hania@mail.com', 'Hania', null, false, 1, now(), now(), now()),
    ('ilona@mail.com', 'Ilona', null, false, 15, now(), now(), now()),
    ('jakub@mail.com', 'Jakub', 'Kuba', true, 99, now(), now(), now());
*/
