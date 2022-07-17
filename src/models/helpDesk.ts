"use strict";

import { TicketStatus } from "service/help-desk/ticketStatus";

const { Model } = require("sequelize");

export interface HelpDeskAttributes {
    id: number;
    user_id: number;
    business_id: number;
    product_id: number;
    message: string;
    status: string;
    insert_date: Date;
    update_date?: Date;
    deleted_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
    class HelpDesk
        extends Model<HelpDesk>
        implements HelpDesk
    {
        id!: number;
        user_id!: number;
        business_id!: number;
        product_id!: number;
        message!: string;
        status!: string;
        insert_date!: Date;
        update_date?: Date;
        deleted_date?: Date;

        static associate(models) {
            HelpDesk.hasMany(models.Users, { foreignKey: "user_id" });
            HelpDesk.hasMany(models.Business, { foreignKey: "business_id" });
            HelpDesk.hasMany(models.Product, { foreignKey: "product_id" });
        }
    }
    HelpDesk.init(
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
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
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "product",
                    key: "id",
                },
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM(TicketStatus.Open, TicketStatus.Closed),
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
            deleted_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "HelpDesk",
            tableName: "help_desk",
            schema: "public",
            timestamps: true,
            createdAt: "insert_date",
            updatedAt: "update_date",
            indexes: [
                {
                    name: "help_desk_pkey",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
    return HelpDesk;
}