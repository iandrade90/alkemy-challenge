const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Expense extends Model {}

Expense.init({
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
  modelName: 'expense',
  timestamps: false
});

module.exports = Expense;
