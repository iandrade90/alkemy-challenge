const express = require('express');
const router = express.Router();
const UserMiddleware = require('../middleware/userMiddleware');
const { userValidationRules, validate } = require('../middleware/verification');

router.use(express.json());

router.get('/users', UserMiddleware.getUsers);

router.post('/registration', UserMiddleware.registration);

router.post('/login', UserMiddleware.login);

router.put('/forgot-password', UserMiddleware.forgotPassword);

router.put('/reset-password', UserMiddleware.resetPassword);

module.exports = router;
