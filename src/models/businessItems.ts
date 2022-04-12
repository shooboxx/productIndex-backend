"use strict";
const { Model } = require("sequelize");

export interface BusinessItemAttributes {
  id: number;
  product_id: number;
  business_id: number;
  product_key: number;
  description?: number;
  tag?: string;
  insert_date?: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class BusinessItem
    extends Model<BusinessItemAttributes>
    implements BusinessItemAttributes
  {
    id!: number;
    product_id!: number;
    business_id!: number;
    product_key!: number;
    description?: number;
    tag?: string;
    insert_date?: Date;
    update_date?: Date;

    static associate(models) {
      BusinessItem.belongsTo(models.Business, { foreignKey: "business_id" });
      BusinessItem.hasMany(models.InventoryItem, { foreignKey: "business_item_id"});
      BusinessItem.belongsTo(models.Product, { foreignKey: "product_id"});


    }
  }
  BusinessItem.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
      },
      business_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "business",
          key: "id",
        },
      },
      product_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tag: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      insert_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "business_item",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "business_item_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return BusinessItem;
};
