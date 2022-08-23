require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PROD_POSTGRES_USER,
    "password": process.env.PROD_POSTGRES_PASSWORD,
    "database": process.env.PROD_POSTGRES_DB,
    "host": process.env.PROD_DB_HOST,
    "dialect": "postgres",
    "port": process.env.PROD_POSTGRES_PORT,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false 
      }
    }
  }
}
