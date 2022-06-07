"use strict";
const { Model } = require("sequelize");

export interface InventoryItemAttributes {
  id: number;
  business_store_id: number;
  product_id: number;
  price?: number;
  quantity?: number;
  available: boolean;
  show_price: boolean;
  insert_date?: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class InventoryItem
    extends Model<InventoryItemAttributes>
    implements InventoryItemAttributes
  {
    id!: number;
    business_store_id!: number;
    product_id!: number;
    price?: number;
    quantity?: number;
    available!: boolean;
    show_price!: boolean;
    insert_date?: Date;
    update_date?: Date;

    static associate(models) {
      InventoryItem.belongsTo(models.BusinessStore, {
        foreignKey: "business_store_id",
      });
      InventoryItem.belongsTo(models.Product, { as: "product", foreignKey: "product_id"});

    }
  }

  InventoryItem.init({
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    show_price: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'inventory_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "inventory_item_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return InventoryItem
};
