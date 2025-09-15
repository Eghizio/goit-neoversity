import { Client } from "pg";

/* -- SQL
CREATE DATABASE neoversity;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL
);
*/

const client = new Client({
  connectionString: process.env.DB_URL,
});

await client.connect();

const User = (email, name) => ({ email, name });

const SaveUser = async ({ email, name }) => {
  return await client.query(
    `INSERT INTO users (email, name) VALUES ($1, $2);`,
    [email, name]
  );
};

const usersToRegister = [
  User("adam@mail.com", "Adam"),
  User("beth@mail.com", "Beth"),
  User("cecil@mail.com", "Cecil"),
];

for (const user of usersToRegister) {
  await SaveUser(user);
}

const users = await client.query(`SELECT * FROM users;`);
console.log(users.rows);

await client.query(`TRUNCATE TABLE users;`); /* Cleanup */

await client.end();
