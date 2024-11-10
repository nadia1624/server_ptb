
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AbsensiKegiatan extends Model {
    static associate(models) {
      AbsensiKegiatan.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });
      AbsensiKegiatan.belongsTo(models.Kegiatan, {
        foreignKey: 'id_kegiatan',
        as: 'kegiatan'
      });
    }
  }
  AbsensiKegiatan.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_kegiatan: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    status_absensi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gambar: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'AbsensiKegiatan'
  });
  return AbsensiKegiatan;
};