"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    static associate(models) {
      // Asosiasi Kegiatan dengan AbsensiKegiatan
      Kegiatan.hasMany(models.AbsensiKegiatan, {
        foreignKey: "id_kegiatan", // Pastikan ini sesuai dengan nama kolom di model AbsensiKegiatan
        as: "absensikegiatans", // Nama alias untuk asosiasi
      });
    }
  }

  Kegiatan.init(
    {
      id_kegiatan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_kegiatan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      deskripsi: DataTypes.TEXT,
      status: {
        type: DataTypes.INTEGER, // Gunakan salah satu tipe data untuk status
        allowNull: false,
      },
      jam_kegiatan: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      tanggal_kegiatan: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Kegiatan",
      tableName: "kegiatans",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  return Kegiatan;
};
