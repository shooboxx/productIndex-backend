export {}
const Sequelize = require('sequelize');
const db = require('../../config/database.js')

const Business =  db.define('business', {
    created_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    business_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    profile_banner_url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    profile_pic_url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING,
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
    freezeTableName: true,
    indexes: [
      {
        name: "business_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

module.exports = Business;