export { }
const Sequelize = require('sequelize');
const db = require('../../config/database.js')
const Users = require("../models/users");
const BusinessTags = require("../models/business_tags")
const Store = require("../models/stores")
const StoreHours = require("../models/business_store_hours")

const Business = db.define('business', {
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

Business.belongsTo(Users, {foreignKey: "created_by" });
Business.hasMany(BusinessTags, { foreignKey: "business_id"});
Store.belongsTo(Business, {foreignKey: "business_id"});
Business.hasMany(Store, { as:"business_stores", foreignKey: "business_id"});
BusinessTags.belongsTo(Business, { foreignKey: "business_id"});
Store.hasMany(StoreHours, { foreignKey: "business_store_id"});
StoreHours.belongsTo(Store, { foreignKey: "business_store_id"});


module.exports = Business;