const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    businessid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business',
        key: 'id'
      }
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business_store',
        key: 'id'
      }
    },
    rating_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    inappropriate_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    flag_reason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deleted_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'review',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "review_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
