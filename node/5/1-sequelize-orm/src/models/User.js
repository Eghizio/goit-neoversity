import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define(
  // "User",
  "user",
  {
    /* id - generated automatically */
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },

    last_login: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER,
  },
  {
    // timestamps: false /* Disabled: createdAt, updatedAt. */,
    timestamps: true,
    createdAt: false,
    updatedAt: "updated_at" /* Rename */,
  }
);

console.log("User:", User === sequelize.models.User);
