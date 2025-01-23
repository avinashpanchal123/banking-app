const { Op } = require("sequelize");
const db = require("../../models");
const { validateUUID } = require("../utils/uuid");

class BankConfig {
  constructor() {
    this.fieldMapping = {
      id: "id",
      name: "name",
      ifscCode: "ifscCode",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      deletedAt: "deletedAt",
    };
    this.model = db.bank;
    this.modelName = db.bank.name;
    this.tableName = db.bank.options.tableName;
    this.columnMapping = {
      id: this.model.rawAttributes[this.fieldMapping.id].field,
      bankName: this.model.rawAttributes[this.fieldMapping.bankName].field,
      abbreviation:
        this.model.rawAttributes[this.fieldMapping.abbreviation].field,
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

      name: (val) => {
        return {
          [`${this.columnMapping.name}`]: {
            [Op.like]: `%${val}%`,
          },
        };
      },

      ifscCode: (val) => {
        return {
          [`${this.columnMapping.ifscCode}`]: {
            [Op.eq]: val,
          },
        };
      },
    };
  }
}

const bankConfig = new BankConfig();

module.exports = bankConfig;
