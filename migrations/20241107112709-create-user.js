'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id_user: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nim: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      jadwal: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      nama_depan: {
        type: Sequelize.STRING
      },
      nama_belakang: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      no_hp: {
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        type: Sequelize.DATE
      },
      jenis_kelamin: {
        type: Sequelize.STRING
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
      tableName: 'users'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};