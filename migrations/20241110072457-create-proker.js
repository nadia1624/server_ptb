'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prokers', {
      id_proker: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_divisi: {
        type: Sequelize.INTEGER,
        references: {
            model: 'divisis', 
            key: 'id_divisi'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      nama_proker: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'prokers'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prokers');
  }
};