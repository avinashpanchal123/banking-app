'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      account_no: {
        type: Sequelize.UUID, 
        defaultValue: Sequelize.UUIDV4, 
        unique:true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      bank_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'banks',
          key: 'id'
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      bank_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'banks',
          key: 'bank_name'
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false,
        defaultValue: 1000.00 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};