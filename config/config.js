require("dotenv").config();

const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB } = process.env;

module.exports = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  stage: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
