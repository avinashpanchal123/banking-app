'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255), 
        allowNull: false, 
        unique: true, 
      },
      ifscCode: {
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

    // await queryInterface.addIndex('banks', ['ifscCode'], {
    //   name: 'idx_banks_ifscCode',
    //   unique: true
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('banks', 'idx_banks_ifscCode');
    await queryInterface.dropTable('banks');
  }
};
