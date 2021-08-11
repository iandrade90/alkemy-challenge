const { Sequelize } = require('sequelize');

//Connection with database

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3'
})

module.exports = sequelize;
