const { Op } = require("sequelize");
const db = require("../../models");
const { validateUUID } = require("../utils/uuid");

class BankConfig {
  constructor() {
    this.fieldMapping = {
      id: "id",
      bank_name: "bank_name",
      abbreviation: "abbreviation",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      deletedAt: "deletedAt",
    };
    this.model = db.bank;
    this.modelName = db.bank.name;
    this.tableName = db.bank.options.tableName;
    this.columnMapping = {
      id: this.model.rawAttributes[this.fieldMapping.id].field,
      bank_name: this.model.rawAttributes[this.fieldMapping.bank_name].field,
      abbreviation:
        this.model.rawAttributes[this.fieldMapping.abbreviation].field,
      createdAt: this.model.rawAttributes[this.fieldMapping.createdAt].field,
      updatedAt: this.model.rawAttributes[this.fieldMapping.updatedAt].field,
    };

    this.association = {
      account: "account",
    };

    this.filters = {
      // id: (val) => {
      //   validateUUID(val);
      //   return {
      //     [`${this.columnMapping.id}`]: {
      //       [Op.eq]: val,
      //     },
      //   };
      // },

      bank_name: (val) => {
        return {
          [`${this.columnMapping.bank_name}`]: {
            [Op.like]: `%${val}%`,
          },
        };
      },

      abbreviation: (val) => {
        return {
          [`${this.columnMapping.abbreviation}`]: {
            [Op.eq]: val,
          },
        };
      },
    };
  }
}

const bankConfig = new BankConfig();

module.exports = bankConfig;
