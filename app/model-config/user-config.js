const { Op } = require("sequelize");
const db = require("../../models");
const { validateUUID } = require("../utils/uuid");

class UserConfig {
    constructor() {
        this.fieldMapping = {
            id: "id",
            firstName: "firstName",
            lastName: "lastName",
            email: "email",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            deletedAt: "deletedAt",
        };
        this.model = db.user;
        this.modelName = db.user.name;
        this.tableName = db.user.options.tableName;
        this.columnMapping = {
            id: this.model.rawAttributes[this.fieldMapping.id].field,
            firstName: this.model.rawAttributes[this.fieldMapping.firstName].field,
            lastName: this.model.rawAttributes[this.fieldMapping.lastName].field,
            email: this.model.rawAttributes[this.fieldMapping.email].field,
            createdAt: this.model.rawAttributes[this.fieldMapping.createdAt].field,
            updatedAt: this.model.rawAttributes[this.fieldMapping.updatedAt].field,
            deletedAt: this.model.rawAttributes[this.fieldMapping.deletedAt].field,
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

            firstName: (val) => {
                return {
                    [`${this.columnMapping.name}`]: {
                        [Op.like]: `%${val}%`,
                    },
                };
            },

            lastName: (val) => {
                return {
                    [`${this.columnMapping.name}`]: {
                        [Op.like]: `%${val}%`,
                    },
                };
            },
            email: (val) => {
                return {
                    [`${this.columnMapping.name}`]: {
                        [Op.like]: `%${val}%`,
                    },
                };
            },
        };
    }
}

const userConfig = new UserConfig();

module.exports = userConfig;
