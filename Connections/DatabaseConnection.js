const { Client } = require("pg");

const dotenv = require("dotenv");
dotenv.config();

// setting up credentials for accessing database
const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER_PASSWORD,
  database: process.env.DATABASE_NAME,
});

client.connect();

module.exports = client;
