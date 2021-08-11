const express = require('express');
const router = express.Router();
const UserMiddleware = require('../middleware/userMiddleware')

router.use(express.json());

router.get('/users', UserMiddleware.getUsers);

router.post('/registration', UserMiddleware.registration);

router.post('/login', UserMiddleware.login);

/*router.post('/test', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err) => {
    if(err){
      res.json({
	message: 'Something went wrong in the verification...'
      });
    } else {
      res.json({
	  message: 'Logged in... '
      });
    }
  });
});

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.json({
      message: 'Something went wrong...'
    })
  }
}
*/

module.exports = router;
