//kegiatan
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    static associate(models) {
      this.belongsToMany(models.User, { 
        through: models.AbsensiKegiatan,
        foreignKey: 'id_kegiatan'
      });
    }
  }
  
  Kegiatan.init({
    id_kegiatan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_kegiatan: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    deskripsi: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    jam_kegiatan: {
      type: DataTypes.TIME,
      allowNull: false
    },
    tanggal_kegiatan: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Kegiatan',
    tableName: 'kegiatan',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
  
  return Kegiatan;
};