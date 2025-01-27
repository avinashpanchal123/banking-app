const { Op } = require("sequelize");
const db = require("../../models");
const { validateUUID } = require("../utils/uuid");

class AccountConfig {
  constructor() {
    this.fieldMapping = {
      id: "id",
      account_no: "account_no",
      user_id: "user_id",
      bank_id: "bank_id",
      balance: "balance",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    };
    this.model = db.account;
    this.modelName = db.account.name;
    this.tableName = db.account.options.tableName;
    this.columnMapping = {
      id: this.model.rawAttributes[this.fieldMapping.id].field,
      account_no: this.model.rawAttributes[this.fieldMapping.account_no].field,
      user_id: this.model.rawAttributes[this.fieldMapping.user_id].field,
      bank_id: this.model.rawAttributes[this.fieldMapping.bank_id].field,
      balance: this.model.rawAttributes[this.fieldMapping.balance].field,
      createdAt: this.model.rawAttributes[this.fieldMapping.createdAt].field,
      updatedAt: this.model.rawAttributes[this.fieldMapping.updatedAt].field,
      
    };

    this.filters = {
      id: (val) => {
        // validateUUID(val);
        return {
          [`${this.columnMapping.id}`]: {
            [Op.eq]: val,
          },
        };
      },

      user_id: (val) => {
        // validateUUID(val);
        return {
          [`${this.columnMapping.userId}`]: {
            [Op.eq]: val,
          },
        };
      },
      bank_id: (val) => {
        // validateUUID(val);
        return {
          [`${this.columnMapping.bankId}`]: {
            [Op.eq]: val,
          },
        };
      },

      balance: (val) => {
        return {
          [`${this.columnMapping.balance}`]: {
            [Op.eq]: val,
          },
        };
      },
    };
  }
}
const accountConfig = new AccountConfig();

module.exports = accountConfig;
