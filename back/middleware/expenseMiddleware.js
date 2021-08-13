const Expense = require('../models/expenseModel');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.read = async function (req, res) {
  try {
    const { IDUser } = req.body;
    const expense = await Expense.findAll({where: {IDUser: IDUser}});
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else {
	res.json(expense);
      }
    });
  }catch(e) {
    console.log(e);
    res.json({message: 'Something went wrong...'});
  }
};

exports.create = async function (req, res) {
  try{
    const {concept, amount, IDUser} = req.body;
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else if(isNaN(amount)) {
	res.json({message: 'Amount has to be a number'});
      } else {
	Expense.create({concept: concept, amount: amount, IDUser: IDUser})
	res.json({message: 'Data inserted'});
      }
    });
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong'});
  }
};

exports.delete = async function (req, res) {
  try{
    const id = req.params.id;
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else {
	Expense.destroy({where: {id: id}});
	res.json({message: 'Data removed...'});
      }
    });
  }catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'});
  }
};

exports.update = async function (req, res) {
  try{
    const id = req.params.id;
    const {concept, amount} = req.body;
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else {
	Expense.update({concept: concept, amount: amount}, {where: {id: id}})
	res.json({message: 'Data updated...'});
      }
    });
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
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else {
	if(expense.length === 0){
	  res.json({message: 'No data on that date...'});
	} else {
	  res.json(expense);
	}
      }
    });
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
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else {
	if(expense.length === 0){
	res.json({message: 'No data on that date...'});
	} else {
	  res.json(expense);
	}
      }
    });
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'});
  }
};
