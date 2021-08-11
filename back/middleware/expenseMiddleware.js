const Expense = require('../models/expenseModel');
const { Op } = require('sequelize');

exports.read = async function (req, res) {
  try {
    const id = req.params.id;
    const expense = await Expense.findAll({where: {IDUser: id}});
    res.json(expense);
  }catch(e) {
    console.log(e);
    res.json({message: 'Something went wrong...'});
  }
};

exports.create = async function (req, res) {
  try{
    const {concept, amount, IDUser} = req.body;
    await Expense.create({concept: concept, amount: amount, IDUser: IDUser})
    res.json({message: 'Data inserted'});
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong'});
  }
};

exports.delete = async function (req, res) {
  try{
    const id = req.params.id;
    await Expense.destroy({where: {id: id}});
    res.json({message: 'Data removed...'});
  }catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'});
  }
};

exports.update = async function (req, res) {
  try{
    const id = req.params.id;
    const {concept, amount} = req.body;
    await Expense.update({concept: concept, amount: amount}, {where: {id: id}})
    res.json({message: 'Data updated...'});
  }catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'})
  }
};

exports.expensesByDate = async function (req, res) {
  try{
    const date = req.params.date;
    const {IDUser} = req.body;
    const expense = await Expense.findAll({where: {IDUser: IDUser, date: date}})
    if(expense.length === 0){
      res.json({message: 'No data on that date...'});
    } else {
      res.json(expense);
    }
  }catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'});
  }
};

exports.expensesByDateRange = async function (req, res) {
  try{
    const { startDate, endDate } = req.params;
    const { IDUser } = req.body;
    const expense = await Expense.findAll({where: {"date": {[Op.between] : [ startDate, endDate ]}, IDUser: IDUser}});
    if(expense.length === 0){
      res.json({message: 'No data on that date...'});
    } else {
      res.json(expense);
    }
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'});
  }
};
