export {}
const Sequelize = require('sequelize')
const db = require('../../config/database.js')

const UserTokens = db.define('user_tokens', {
    user_id: {
        type: Sequelize.INTEGER
    },
    refresh_token: {
        type: Sequelize.STRING
    },
    insert_date: {
        type: Sequelize.DATE
    },

}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = UserTokens