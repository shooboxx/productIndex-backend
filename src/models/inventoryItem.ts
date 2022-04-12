"use strict";
const { Model } = require("sequelize");

export interface InventoryItemAttributes {
  id: number;
  business_item_id: number;
  business_store_id: number;
  price?: number;
  quantity?: number;
  insert_date?: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class InventoryItem
    extends Model<InventoryItemAttributes>
    implements InventoryItemAttributes
  {
    id!: number;
    business_item_id!: number;
    business_store_id!: number;
    price?: number;
    quantity?: number;
    insert_date?: Date;
    update_date?: Date;

    static associate(models) {
      InventoryItem.belongsTo(models.BusinessItem, {
        foreignKey: "business_item_id",
      });
      InventoryItem.belongsTo(models.BusinessStore, {
        foreignKey: "business_store_id",
      });
    }
  }

  InventoryItem.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      business_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "business_item",
          key: "id",
        },
      },
      business_store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "business_store",
          key: "id",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
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
      tableName: "inventory_item",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "inventory_item_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return InventoryItem
};
