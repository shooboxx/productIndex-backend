// const dbenv = require('./config')
// const pg = dbenv[process.env.NODE_ENV]


const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, DB_HOST, POSTGRES_PORT} = process.env;
const Sequelize = require('sequelize')
const db = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
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
