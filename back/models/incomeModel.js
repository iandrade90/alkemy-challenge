const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Income extends Model {}

Income.init({
  concept: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: function getDateWithoutTime(date){
      return require('moment')(date).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'income',
  timestamps: false
});

module.exports = Income;
