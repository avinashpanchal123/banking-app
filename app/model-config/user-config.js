const { Op } = require("sequelize");
const db = require("../../models");
// const { validateUUID } = require("../utils/uuid");

class UserConfig {
    constructor() {
        this.fieldMapping = {
            id: "id",
            full_name: "full_name",
            username: "username",
            email: "email",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        };
        this.model = db.user;
        this.modelName = db.user.name;
        this.tableName = db.user.options.tableName;
        this.columnMapping = {
            id: this.model.rawAttributes[this.fieldMapping.id].field,
            full_name: this.model.rawAttributes[this.fieldMapping.full_name].field,
            username: this.model.rawAttributes[this.fieldMapping.username].field,
            email: this.model.rawAttributes[this.fieldMapping.email].field,
            createdAt: this.model.rawAttributes[this.fieldMapping.createdAt].field,
            updatedAt: this.model.rawAttributes[this.fieldMapping.updatedAt].field,
        
        };

        this.association = {
            account: "account",
        };

        // this.filters = {
        //     id: (val) => {
        //         validateUUID(val);
        //         return {
        //             [`${this.columnMapping.id}`]: {
        //                 [Op.eq]: val,
        //             },
        //         };
        //     },

        //     ful_name: (val) => {
        //         return {
        //             [`${this.columnMapping.name}`]: {
        //                 [Op.like]: `%${val}%`,
        //             },
        //         };
        //     },

        //     username: (val) => {
        //         return {
        //             [`${this.columnMapping.name}`]: {
        //                 [Op.like]: `%${val}%`,
        //             },
        //         };
        //     },
        //     email: (val) => {
        //         return {
        //             [`${this.columnMapping.name}`]: {
        //                 [Op.like]: `%${val}%`,
        //             },
        //         };
        //     },
        // };
    }
}

const userConfig = new UserConfig();

module.exports = userConfig;
