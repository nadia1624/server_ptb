'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('absensis', {
        id_rekapan: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'rekapans',
              key: 'id_rekapan'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id_user'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          status: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          gambar: {
            type: Sequelize.STRING(255),
            allowNull: true
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
          tableName: 'absensis'
        });
      },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('absensis');
  }
};