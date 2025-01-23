'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Associations can be defined here
            Transaction.belongsTo(models.account, { foreignKey: 'from_ac' });
            Transaction.belongsTo(models.account, { foreignKey: 'to_ac' });
            Transaction.belongsTo(models.bank, { foreignKey: 'from_bank' });
            Transaction.belongsTo(models.bank, { foreignKey: 'to_bank' });
        }
    }

    Transaction.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            transaction_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            from_ac: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'accounts',
                    key: 'account_no',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            to_ac: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'accounts',
                    key: 'account_no',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            from_bank: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'banks',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            to_bank: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'banks',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            transaction_type: {
                type: DataTypes.ENUM('debit', 'credit'),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('pending', 'completed', 'failed'),
                allowNull: false,
                defaultValue: 'pending',
            },
        },
        {
            sequelize,
            modelName: 'transaction',
            tableName: 'transactions',
            timestamps: true,
        }
    );

    return Transaction;
};
