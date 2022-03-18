export {}
const Sequelize = require('sequelize');
const db = require('../../config/database.js')
const Business = require("../models/business")

const BusinessTags = db.define('business_tags', {
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
    tag: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    insert_date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    update_date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'business_tags',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "business_tags_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });



module.exports = BusinessTags