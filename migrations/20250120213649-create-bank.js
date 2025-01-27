'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      bank_name: {
        type: Sequelize.STRING(255), 
        allowNull: false, 
        unique: true, 
      },
      abbreviation: {
        type: Sequelize.STRING(11), 
        allowNull: false, 
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      }
    });

    // await queryInterface.addIndex('banks', ['abbreviation'], {
    //   name: 'idx_banks_abbreviation',
    //   unique: true
    // });
  },
  async down(queryInterface, Sequelize) {
   // await queryInterface.removeIndex('banks', 'idx_banks_abbreviation');
    await queryInterface.dropTable('banks');
  }
};
