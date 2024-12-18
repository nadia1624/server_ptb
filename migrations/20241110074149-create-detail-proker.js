'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_prokers', {
      id_detailproker: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_proker: {
        type: Sequelize.INTEGER,
        references: {
            model: 'prokers', 
            key: 'id_proker'}
      },
      judul_detail_proker: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATE
      },
      gambar: {
        type: Sequelize.STRING
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
      tableName: 'detail_prokers'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_prokers');
  }
};