const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Station = sequelize.define('station',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    adress: { type: DataTypes.STRING },
    latitude: { type: DataTypes.FLOAT },
    longitude: { type: DataTypes.FLOAT },
    connectors_total: {type: DataTypes.INTEGER },
    connector0_power: { type: DataTypes.INTEGER },
    connector1_power: { type: DataTypes.INTEGER },
    connector2_power: { type: DataTypes.INTEGER },
    evse_type: { type: DataTypes.BOOLEAN },

 }, {
        timestamps: false // Здесь указываем отключение автоматически создаваемых столбцов
      });

const Zone = sequelize.define('przones', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:{type: DataTypes.INTEGER,},
    polygon: {type: DataTypes.GEOMETRY,},
    rating: {type: DataTypes.FLOAT,}
}, {
    timestamps: false // Здесь указываем отключение автоматически создаваемых столбцов
  });

module.exports = {
    Station,
    Zone
}