'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.UUID, 
        defaultValue: Sequelize.UUIDV4, 
        allowNull: false,
        unique: true
      },
      from_ac: {
        type: Sequelize.UUID, 
        allowNull: false,
        references: {
          model: 'accounts', 
          key: 'account_no'
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      to_ac: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'account_no'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      from_bank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'banks', 
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      to_bank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'banks',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false
      },
      transaction_type: {
        type: Sequelize.ENUM('debit', 'credit', 'transfer'), 
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'), 
        defaultValue: 'pending',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
