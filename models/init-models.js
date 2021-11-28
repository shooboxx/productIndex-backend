var DataTypes = require("sequelize").DataTypes;
var _business = require("./business");
var _business_portfolio = require("./business_portfolio");
var _business_store_hours = require("./business_store_hours");
var _product = require("./product");
var _review = require("./review");
var _single_sign_on = require("./single_sign_on");
var _single_sign_on_user_link = require("./single_sign_on_user_link");
var _user_agent_data = require("./user_agent_data");
var _user_business_role = require("./user_business_role");

function initModels(sequelize) {
  var business = _business(sequelize, DataTypes);
  var business_portfolio = _business_portfolio(sequelize, DataTypes);
  var business_store_hours = _business_store_hours(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var single_sign_on = _single_sign_on(sequelize, DataTypes);
  var single_sign_on_user_link = _single_sign_on_user_link(sequelize, DataTypes);
  var user_agent_data = _user_agent_data(sequelize, DataTypes);
  var user_business_role = _user_business_role(sequelize, DataTypes);

  business_portfolio.belongsTo(business, { as: "business", foreignKey: "businessid"});
  business.hasMany(business_portfolio, { as: "business_portfolios", foreignKey: "businessid"});
  product.belongsTo(business, { as: "business", foreignKey: "business_id"});
  business.hasMany(product, { as: "products", foreignKey: "business_id"});
  review.belongsTo(business, { as: "business", foreignKey: "businessid"});
  business.hasMany(review, { as: "reviews", foreignKey: "businessid"});
  user_business_role.belongsTo(business_role, { as: "business_role", foreignKey: "business_role_id"});
  business_role.hasMany(user_business_role, { as: "user_business_roles", foreignKey: "business_role_id"});
  business_store_hours.belongsTo(business_store, { as: "business_store", foreignKey: "business_store_id"});
  business_store.hasMany(business_store_hours, { as: "business_store_hours", foreignKey: "business_store_id"});
  review.belongsTo(business_store, { as: "store", foreignKey: "store_id"});
  business_store.hasMany(review, { as: "reviews", foreignKey: "store_id"});
  single_sign_on_user_link.belongsTo(single_sign_on, { as: "single_sign_on", foreignKey: "single_sign_onid"});
  single_sign_on.hasMany(single_sign_on_user_link, { as: "single_sign_on_user_links", foreignKey: "single_sign_onid"});
  review.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(review, { as: "reviews", foreignKey: "user_id"});
  single_sign_on_user_link.belongsTo(users, { as: "user", foreignKey: "usersid"});
  users.hasMany(single_sign_on_user_link, { as: "single_sign_on_user_links", foreignKey: "usersid"});
  user_agent_data.belongsTo(users, { as: "user", foreignKey: "usersid"});
  users.hasMany(user_agent_data, { as: "user_agent_data", foreignKey: "usersid"});
  user_business_role.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_business_role, { as: "user_business_roles", foreignKey: "user_id"});

  return {
    business,
    business_portfolio,
    business_store_hours,
    product,
    review,
    single_sign_on,
    single_sign_on_user_link,
    user_agent_data,
    user_business_role,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
