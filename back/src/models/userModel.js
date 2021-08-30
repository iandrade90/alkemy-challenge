const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const Income = require('./incomeModel');
const Expense = require('./expenseModel');

//User Model

class User extends Model {}

User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resetToken: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'user'
  });


User.hasMany(Income, {foreignKey: 'IDUser', onDelete: 'CASCADE'});
User.hasMany(Expense, {foreignKey: 'IDUser', onDelete: 'CASCADE'});

module.exports = User;
