
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Kegiatans', {
      id_kegiatan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama_kegiatan: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      jam_kegiatan: {
        type: Sequelize.TIME,
        allowNull: true
      },
      tanggal_kegiatan: {
        type: Sequelize.DATE,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kegiatans');
  }
};