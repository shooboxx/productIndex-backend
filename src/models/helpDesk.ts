"use strict";

const { Model } = require("sequelize");

export interface HelpDeskAttributes {
    id: number;
    user_id: number;
    subject: string;
    message: string;
    status: string;
    priority_level: string,
    insert_date: Date;
    update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
    class HelpDesk
        extends Model<HelpDesk>
        implements HelpDesk
    {
        id!: number;
        user_id!: number;
        message!: string;
        subject!: string;
        status!: string;
        priority_level!: string;
        insert_date!: Date;
        update_date?: Date;

        static associate(models) {
            HelpDesk.hasMany(models.Users, { foreignKey: "user_id" });
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
            subject: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            message: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            status: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            priority_level: {
                type: DataTypes.STRING(50),
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