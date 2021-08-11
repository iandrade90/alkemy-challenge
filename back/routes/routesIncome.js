const express = require('express');
const router = express.Router();
const incomeMiddleware = require('../middleware/incomeMiddleware');

router.use(express.json());

router.get('/incomes/:id', incomeMiddleware.read);

router.post('/add-income', incomeMiddleware.create);

router.delete('/remove-income/:id', incomeMiddleware.delete);

router.put('/update-income/:id', incomeMiddleware.update);

router.post('/incomes-by-date/:date', incomeMiddleware.incomeByDate);

router.post('/incomes-by-daterange/:startDate&:endDate', incomeMiddleware.incomeByDateRange);

module.exports = router;
