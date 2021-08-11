const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//GET USERS

exports.getUsers = async function(req, res) {
  try {
    const users = await UserModel.findAll();
    res.send(users);
  } catch(e) {
    console.log(e);
  }
};

//NEW USER REGISTRATION

exports.registration = async function (req, res) {
  try {
    const {username, email, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    await UserModel.create({username:username, email:email, password:hash});
      res.status(200).send('User is inserted');
  } catch(e) {
    console.log(e.message);
    res.status(500).json({
      message: 'Username or Email already in use'
    })
  }
};

//USER LOGIN

exports.login = async function (req, res) {
  try {
    const {username, email, password} = req.body;
    const data = await UserModel.findOne({where: {username: username, email: email}});
    if(data){
      const validPass = await bcrypt.compare(password, data.password);
      if(validPass){
	jwt.sign({data}, process.env.SECRET_KEY, { expiresIn: '10m' }, (err, token) =>{
	  if(token){
	    res.json({token:token});
	  } else {
	    console.log(err.message);
	  }
	});
      } else {
	res.json({message: 'Wrong password...'});
      }
    } else {
      res.json({message: 'Wrong username...'});
    }
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Wrong credentials...'})
  };
};

