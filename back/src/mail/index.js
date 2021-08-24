const nodemailer = require('nodemailer');
require('dotenv').config();

const createTrans = () => {
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });
  
  return transport;

}

const sendMail = async (user) => {
  const transporter = createTrans()
  const info = await transporter.sendMail({
    from: 'Password Recovery',
    to: `${user.email}`,
    subject: 'Password Recovery',
    html: `<a href='http://localhost:8000/api/password-reset/${user.resetToken}'>Click aqui</a>`
  });
  
  console.log('Email sent');
  
  return

}

exports.sendMail = (user) => sendMail(user);
