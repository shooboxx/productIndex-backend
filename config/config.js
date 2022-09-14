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
    "username": process.env.TEST_POSTGRES_USER,
    "password": process.env.TEST_POSTGRES_PASSWORD,
    "database": process.env.TEST_POSTGRES_DB,
    "host": process.env.TEST_DB_HOST,
    "dialect": "postgres",
    "port": process.env.TEST_POSTGRES_PORT,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false 
      }
    }
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
