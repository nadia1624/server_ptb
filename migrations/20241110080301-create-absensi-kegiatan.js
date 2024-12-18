"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absensikegiatans", {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id_user",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_kegiatan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "kegiatans",
          key: "id_kegiatan",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status_absensi: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gambar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'absensikegiatans'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("absensikegiatans");
  },
};
