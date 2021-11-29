require("dotenv").config();

const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, DB_HOST } = process.env;

module.exports = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: DB_HOST,
    dialect: "postgres",
  },
  stage: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: DB_HOST,
    dialect: "postgres",
  },
};
