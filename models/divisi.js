'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Divisi extends Model {
    static associate(models) {
      Divisi.hasMany(models.User, {
        foreignKey: 'id_divisi',  
        as: 'users'         
      });
      Divisi.hasMany(models.Proker, {
        foreignKey: 'id_divisi',  
        as: 'prokers'         
      });    
    }
  }
  
  Divisi.init({
    id_divisi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nama_divisi: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Divisi',
  });
  
  return Divisi;
};
