export { }
const Sequelize = require('sequelize')
const db = require('../../config/database.js')
import { HookReturn } from 'sequelize/types/lib/hooks';

const BusinessStore = db.define('business_store', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    business_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'business',
            key: 'id'
        }
    },
    unique_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: "business_store_unique_name_key"
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    phone_2: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    phone_3: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    address_line_1: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    address_line_2: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    latitude: {
        type: Sequelize.REAL,
        allowNull: true
    },
    longitude: {
        type: Sequelize.REAL,
        allowNull: true
    },
    country: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    city: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    postal_code: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    is_primary: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    temp_or_perm_closure: {
        type: Sequelize.CHAR(4),
        allowNull: true
    },
    reopen_date: {
        type: Sequelize.DATEONLY,
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
        tableName: 'business_store',
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