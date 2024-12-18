'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    static associate(models) {
      Notifikasi.belongsTo(models.detail_proker,{
        foreignKey:'id_detailproker',
        as:'detail_proker'
      });
    }
  }
  Notifikasi.init({
    id_notif: DataTypes.INTEGER,
    id_detailproker: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notifikasi',
    tableName: 'notifikasis'
  });
  return Notifikasi;
};