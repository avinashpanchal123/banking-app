const { Op } = require("sequelize");
const db = require("../../models");
const { validateUUID } = require("../utils/uuid");

class TransactionConfig {
    constructor() {
        this.fieldMapping = {
            id: "id",
            transaction_id: "transaction_id",
            from_account: "from_account",
            to_account: "to_account",
            from_bank: "from_bank",
            to_bank: "to_bank",
            amount: "amount",
            // transaction_type: "transaction_type",
            status: "status",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            deletedAt: "deletedAt",
        };
        this.model = db.transaction;
        this.modelName = db.transaction.name;
        this.tableName = db.transaction.options.tableName;
        this.columnMapping = {
            id: this.model.rawAttributes[this.fieldMapping.id].field,
            transaction_id: this.model.rawAttributes[this.fieldMapping.transaction_id].field,
            from_account: this.model.rawAttributes[this.fieldMapping.from_account].field,
            to_account: this.model.rawAttributes[this.fieldMapping.to_account].field,
            from_bank: this.model.rawAttributes[this.fieldMapping.from_bank].field,
            to_bank: this.model.rawAttributes[this.fieldMapping.to_bank].field,
            amount: this.model.rawAttributes[this.fieldMapping.amount].field,
            status: this.model.rawAttributes[this.fieldMapping.status],
            createdAt: this.model.rawAttributes[this.fieldMapping.createdAt].field,
            updatedAt: this.model.rawAttributes[this.fieldMapping.updatedAt].field,
        };

        this.association = {
            account: "account",
        };

        this.filters = {
            id: (val) => {
                validateUUID(val);
                return {
                    [`${this.columnMapping.id}`]: {
                        [Op.eq]: val,
                    },
                };
            },

            // transaction_id: (val) => {
            //     validateUUID(val)
            //     return {
            //         [`${this.columnMapping.name}`]: {
            //             [Op.like]: `%${val}%`,
            //         },
            //     };
            // },
        };
    }
}

const transactionConfig = new TransactionConfig();

module.exports = transactionConfig;