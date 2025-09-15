/* Data Types & Schema configuration examples */

import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Example = sequelize.define(
  "example_model",
  {
    // data_type: DataTypes.STRING,
    // data_type: DataTypes.STRING(16),
    // data_type: DataTypes.STRING(undefined, true),
    // data_type: DataTypes.TEXT,
    // data_type: DataTypes.TEXT("long"),
    // data_type: DataTypes.BOOLEAN,
    // data_type: DataTypes.INTEGER,
    // data_type: DataTypes.INTEGER.UNSIGNED,
    // data_type: DataTypes.INTEGER.ZEROFILL,
    // data_type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
    // data_type: DataTypes.BIGINT,
    // data_type: DataTypes.FLOAT,
    // data_type: DataTypes.REAL,
    // data_type: DataTypes.DOUBLE,
    // data_type: DataTypes.DECIMAL,
    // data_type: DataTypes.DATE,
    // data_type: DataTypes.DATEONLY,
    // data_type: DataTypes.UUID,
    // data_type: DataTypes.UUIDV4,

    identifier: { type: DataTypes.STRING, primaryKey: true },
    counter: { type: DataTypes.INTEGER, autoIncrement: true },
    indexed_field: { type: DataTypes.STRING, unique: "compositeIndex" },
    renamed: { type: DataTypes.STRING, field: "renamed_field" },
    with_comment: { type: DataTypes.STRING, comment: "Comment" },
    bar_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Bar,
        key: "id" /* Column in the referenced Model */,
        deferrable:
          Deferrable.INITIALLY_IMMEDIATE /* For PostgreSQL: define deferrable constraint behaviour */,
        /*
            Deferrable.INITIALLY_IMMEDIATE — checks foreign key constraints immediately
            Deferrable.INITIALLY_DEFERRED — checks are deferred to the end of the transaction
            Deferrable.NOT — disables deferral; constraints are enforced immediately and statically
        */
      },
    },
    to_be_indexed: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["to_be_indexed"],
      },
    ],
  }
);

console.log(Example === sequelize.models.Example);
