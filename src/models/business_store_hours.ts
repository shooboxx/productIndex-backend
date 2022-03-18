export {}
const Sequelize = require('sequelize');
const db = require('../../config/database.js')

const StoreHours = db.define('business_store_hours', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    business_store_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'business_store',
        key: 'id'
      }
    },
    monday_open: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    monday_closed: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    tuesday_open: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    tuesday_closed: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    wednesday_open: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    wednedsay_closed: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    thursday_open: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    thursday_closed: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    friday_open: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    friday_closed: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    saturday_open: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    saturday_closed: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    sunday_open: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    sunday_closed: {
      type: Sequelize.STRING(255),
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
  }, {
    tableName: 'business_store_hours',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "business_store_hours_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  module.exports = StoreHours;