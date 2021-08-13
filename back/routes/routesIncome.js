const express = require('express');
const router = express.Router();
const incomeMiddleware = require('../middleware/incomeMiddleware');
const verification = require('../middleware/verification');

router.use(express.json());

router.get('/incomes', verification.verifyToken, incomeMiddleware.read);

router.post('/add-income', verification.verifyToken, incomeMiddleware.create);

router.delete('/remove-income/:id', verification.verifyToken, incomeMiddleware.delete);

router.put('/update-income/:id', verification.verifyToken, incomeMiddleware.update);

router.post('/incomes-by-date/:date', verification.verifyToken, incomeMiddleware.incomeByDate);

router.post('/incomes-by-daterange/:startDate&:endDate', verification.verifyToken, incomeMiddleware.incomeByDateRange);

module.exports = router;
