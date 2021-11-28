export { }
const Sequelize = require('sequelize')
const db = require('../../config/database.js')
import { HookReturn } from 'sequelize/types/lib/hooks';

const Business = db.define('business',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        business_name: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        profile_banner_url: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        profile_pic_url: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        insert_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        update_date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'business',
        timestamps: true,
        createdAt: 'insert_date',
        updatedAt: 'update_date',
        freezeTableName: true,
        hooks: {
            beforeCount(options: any): HookReturn {
                options.raw = true;
            }
        }
    })

module.exports = Business