'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bank.init({
    
    bank_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    abbreviation: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'bank',
    // underscored: true,
  });
  return bank;
};