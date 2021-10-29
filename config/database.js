const dbenv = require('./config')
const pg = dbenv[process.env.NODE_ENV]
const Sequelize = require('sequelize')
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
