import { Sequelize } from "sequelize";
import { sequelize, User } from "./User.js";

const Log = (result) => console.log({ result });

await User.sync({ force: true });
await User.destroy({ truncate: true });

/* https://sequelize.org/docs/v6/other-topics/hooks/#available-hooks */

/* Hook registrations */
User.addHook("beforeCreate", (user, options) => {
  user.points = 42;
});

User.afterValidate((user, options) => {
  console.log({ options });
});

/* Hook removal */
User.removeHook("beforeCreate");

/* Global Hooks */
const sequelizeWithGlobalHooks = new Sequelize({
  define: {
    hooks: {
      beforeCreate() {
        /* ... For all models. */
      },
    },
  },
});

const Player = sequelizeWithGlobalHooks.define(
  "player",
  {},
  {
    hooks: {
      beforeCreate() {
        /* ... Overrides global hook. */
      },
    },
  }
);

/* Connection Hooks */
sequelize.beforeConnect(async (config) => {
  console.log("Before connection");
});

sequelize.afterConnect(async (connection, config) => {
  console.log("After connection");
});

sequelize.beforeDisconnect(async (connection) => {
  console.log("Before disconnection");
});

sequelize.afterDisconnect(async (connection) => {
  console.log("After disconnection");
});

/* Instance Hooks */
User.beforeValidate(() => {});
User.afterValidate(() => {});
User.validationFailed(() => {});

User.beforeCreate(() => {});
User.beforeUpdate(() => {});
User.beforeSave(() => {});
User.beforeDestroy(() => {});

User.afterCreate(() => {});
User.afterUpdate(() => {});
User.afterSave(() => {});
User.afterDestroy(() => {});

User.beforeBulkCreate(() => {});
User.beforeBulkUpdate(() => {});
User.beforeBulkDestroy(() => {});

User.afterBulkCreate(() => {});
User.afterBulkUpdate(() => {});
User.afterBulkDestroy(() => {});

/* Model - individualHooks */
