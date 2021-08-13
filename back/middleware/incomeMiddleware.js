const Income = require('../models/incomeModel');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.read = async function (req, res) {
  try {
    const IDUser = req.body;
    const income = await Income.findAll({where: {IDUser: IDUser}});
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else {
      res.json(income);
      }
    });
  }catch(e) {
    console.log(e);
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
	Income.create({concept: concept, amount: amount, IDUser: IDUser})
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
	Income.destroy({where: {id: id}});
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
	Income.update({concept: concept, amount: amount}, {where: {id: id}})
	res.json({message: 'Data updated...'});
      }
    });
  }catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'})
  }
};

exports.incomeByDate = async function (req, res) {
  try{
    const date = req.params.date;
    const {IDUser} = req.body;
    const income = await Income.findAll({where: {IDUser: IDUser, date: date}})
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else {
	if(income.length === 0){
	  res.json({message: 'No data on that date...'});
	} else {
	  res.json(income);
	}
      }
    });
  }catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'});
  }
};

exports.incomeByDateRange = async function (req, res) {
  try{
    const { startDate, endDate } = req.params;
    const { IDUser } = req.body;
    const income = await Income.findAll({where: {"date": {[Op.between] : [ startDate, endDate ]}, IDUser: IDUser}});
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if(err) {
	res.json({message: 'Something went wrong with the verification'});
      } else {
	if(income.length === 0){
	  res.json({message: 'No data on that date...'});
	} else {
	  res.json(income);
	}
      }
    });
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'});
  }
};
