const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_agent_data', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usersid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    user_agent: {
      type: DataTypes.TEXT,
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
    tableName: 'user_agent_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_agent_data_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
