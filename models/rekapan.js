'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rekapan extends Model {
    static associate(models) {
        Rekapan.hasMany(models.Absensi, {
          foreignKey: 'id_rekapan',
          as: 'absensis'
        });
    }
  }
  Rekapan.init({
    id_rekapan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      minggu_ke: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Rekapan',
      tableName: 'Rekapans',
      timestamps: true
    });
  return Rekapan;
};