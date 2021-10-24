require("dotenv").config();

const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB } = process.env;
const Sequelize = require('sequelize')
const dbenv = {
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

const pg = dbenv[process.env.NODE_ENV]

const db = new Sequelize(pg.database, pg.username, pg.password, {
    host: pg.host,
    dialect: pg.dialect,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    },
})
// Test db connection
db.authenticate().then(() => console.log('Database connected')).catch(err => console.log(err))
module.exports = db
