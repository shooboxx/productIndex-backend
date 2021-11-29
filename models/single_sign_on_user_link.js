const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('single_sign_on_user_link', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    single_sign_onid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'single_sign_on',
        key: 'id'
      }
    },
    usersid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    sso_token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'single_sign_on_user_link',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "single_sign_on_user_link_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
