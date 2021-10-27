export {}
const Sequelize = require('sequelize')
const db = require('../../config/database.js')

const User = db.define('users', {
    system_role_id: {
        type: Sequelize.INTEGER
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email_address: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    date_of_birth: {
        type: Sequelize.DATE 
    },
    gender: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    profile_pic_url: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.STRING
    },
    is_verified: {
        type: Sequelize.BOOLEAN
    },
    verify_token: {
        type: Sequelize.STRING
    },
    verify_expires: {
        type: Sequelize.STRING
    },
    verify_changes: {
        type: Sequelize.STRING
    },
    reset_token: {
        type: Sequelize.STRING
    },
    primary_phone_contact: {
        type: Sequelize.STRING
    },
    deleted_date: {
        type: Sequelize.DATE
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

module.exports = User