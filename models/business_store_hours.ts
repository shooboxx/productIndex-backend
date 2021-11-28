const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('business_store_hours', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    business_store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business_store',
        key: 'id'
      }
    },
    monday_open: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    monday_closed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tuesday_open: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tuesday_closed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wednesday_open: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wednedsay_closed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    thursday_open: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    thursday_closed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    friday_open: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    friday_closed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    saturday_open: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    saturday_closed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sunday_open: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sunday_closed: {
      type: DataTypes.STRING(255),
      allowNull: true
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
};
