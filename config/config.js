require("dotenv").config();

const Sequelize = require('sequelize')
const dbenv = {
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
