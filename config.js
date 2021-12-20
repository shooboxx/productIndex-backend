require("dotenv").config();

module.exports = {
  development: {
    username: 'productindex',
    password: 'productindex',
    database: 'productindex-dev',
    host: "localhost",
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

