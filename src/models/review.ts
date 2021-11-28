export { }
const Sequelize = require('sequelize')
const db = require('../../config/database.js')

const Review = db.define('review', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    businessid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'business',
            key: 'id'
        }
    },
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'business_store',
            key: 'id'
        }
    },
    rating_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    inappropriate_flag: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    flag_reason: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    deleted_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    insert_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    update_date: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Review