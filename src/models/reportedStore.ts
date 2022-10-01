"use strict";
const { Model } = require("sequelize");

export interface ReportedStoreAttributes {
    store_id : number;
    reported_by: number;
    reported_reason: string;
    insert_date?: Date;
    update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class ReportedStore
    extends Model<ReportedStoreAttributes>
    implements ReportedStoreAttributes
  {
    store_id!: number;
    reported_by!: number;
    reported_reason!: string;
    insert_date?: Date;
    update_date?: Date;
    static associate(models) {
        ReportedStore.belongsTo(models.BusinessStore, {foreignKey: "store_id"});
        ReportedStore.belongsTo(models.Users, {foreignKey: "reported_by"});
    }
  }
  ReportedStore.init(
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "business_store",
                key: "id",
            },
        },
        reported_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
      reported_reason: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      insert_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "reported_store",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      primaryKey: false
    }
  );

  return ReportedStore;
};
