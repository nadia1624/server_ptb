'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifikasis', {
      id_notif: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_detailproker: {
        type: Sequelize.INTEGER,
        references: {
            model: 'detail_prokers', 
            key: 'id_detailproker'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER
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
      tableName: 'notifikasis'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notifikasis');
  }
};