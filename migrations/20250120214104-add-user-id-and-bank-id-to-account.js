'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('accounts', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id' 
      },
    });

    await queryInterface.addColumn('accounts', 'bank_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'banks',
        key: 'id' 
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('accounts', 'user_id');
    await queryInterface.removeColumn('accounts', 'bank_id');
  }
};
