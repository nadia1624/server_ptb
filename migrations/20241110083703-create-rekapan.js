'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rekapans', {
      id_rekapan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      minggu_ke: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    },
    {
      tableName: 'rekapans'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rekapans');
  }
};