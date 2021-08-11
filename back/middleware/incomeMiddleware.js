const Income = require('../models/incomeModel');
const { Op } = require('sequelize');

exports.read = async function (req, res) {
  try {
    const id = req.params.id;
    const income = await Income.findAll({where: {IDUser: id}});
    res.json(income);
  }catch(e) {
    console.log(e);
  }
};

exports.create = async function (req, res) {
  try{
    const {concept, amount, IDUser} = req.body;
    await Income.create({concept: concept, amount: amount, IDUser: IDUser})
    res.json({message: 'Data inserted'});
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong'});
  }
};

exports.delete = async function (req, res) {
  try{
    const id = req.params.id;
    await Income.destroy({where: {id: id}});
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
    await Income.update({concept: concept, amount: amount}, {where: {id: id}})
    res.json({message: 'Data updated...'});
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
    if(income.length === 0){
      res.json({message: 'No data on that date...'});
    } else {
      res.json(income);
    }
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
    if(income.length === 0){
      res.json({message: 'No data on that date...'});
    } else {
      res.json(income);
    }
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong...'});
  }
};
