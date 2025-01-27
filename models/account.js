'use strict';
const { types } = require('pg');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.user, { foreignKey: 'user_id' });
      Account.belongsTo(models.bank, { foreignKey: 'bank_id' });
    }
  }
  Account.init({
    account_no: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
    },
    bank_id: {
      type: DataTypes.UUID,
      allowNull: false,

    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
  }, {
    sequelize,
    modelName: 'account',
    // underscored: true,
  });
  return Account;
};
