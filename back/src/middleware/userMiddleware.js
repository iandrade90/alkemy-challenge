const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Email = require('../mail/index');
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

exports.registration = async function (req, res, next) {
  try {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const {username, email, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const findByUser = await UserModel.findOne({where: {username: username}});
    const findByEmail = await UserModel.findOne({where: {email: email}});

    if(findByUser){
      res.send('Username already exists');
      return next();
    }
    
    if(findByEmail){
      res.send('Email already exists');
      return next();
    }

    if(!password.match(regex)){
      res.send('Password must be at least 8 characters long, one capital letter and numbers');
      return next();
    }
    
    await UserModel.create({username: username, email: email, password: hash});
    res.send('Registration Succesful');
      
  } catch(e) {
    console.log(e.message);
    res.send('Something went wrong')
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
        jwt.sign({data}, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) =>{
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

exports.forgotPassword = async function (req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({where: {email: email}});
    const token = jwt.sign({username: user.username, update: user.updatedAt}, process.env.SECRET_KEY_RESET, {expiresIn: '20m'});
    if(!user){
      res.json({message: 'User not found'});
    } else {
      UserModel.update({resetToken: token}, {where: {email: email}});
      res.json({message: 'ResetToken OK'})
      Email.sendMail(user);
    }
    
  } catch(e) {
    console.log(e.message);
  }
}

exports.resetPassword = async function (req, res) {
  try{
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const {username, password, resetToken} = req.body;
    const user = await UserModel.findOne({where: {username: username}});
    const hash = await bcrypt.hash(password, 10);
    if(user) {
      jwt.verify(resetToken, process.env.SECRET_KEY_RESET, (err) => {
	if(err) {
	  console.log(err.message);
	  res.json({message: 'Invalid Token or it is expired'});
	} else {
	  if(password.match(regex)) {
	    UserModel.update({password: hash}, {where: {username: username}});
	    res.json({message: 'Password reset'});
	  } else {
	    res.json({message: 'Password too weak'});
	  }
	}
      });
    } else {
      res.json({message: 'Authentication error!'});
    }
  } catch(e) {
    console.log(e.message);
    res.json({message: 'Something went wrong'});
  }
};
