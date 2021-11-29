export {}
const Sequelize = require('sequelize')
const db = require('../../config/database.js')

const SystemRole = db.define('system_role', {
    role_name: {
        type: Sequelize.STRING
    },
    access_level: {
        type: Sequelize.INTEGER
    },
    insert_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    update_date: {
        type: Sequelize.DATE
    },
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = SystemRole