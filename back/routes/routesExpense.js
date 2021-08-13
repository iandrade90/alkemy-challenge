const express = require('express');
const router = express.Router();
const expenseMiddleware = require('../middleware/expenseMiddleware');
const verification = require('../middleware/verification');

router.use(express.json());

router.get('/expenses', verification.verifyToken, expenseMiddleware.read);

router.post('/add-expense', verification.verifyToken, expenseMiddleware.create);

router.delete('/remove-expense/:id', verification.verifyToken, expenseMiddleware.delete);

router.put('/update-expense/:id', verification.verifyToken, expenseMiddleware.update);

router.post('/expenses-by-date/:date', verification.verifyToken, expenseMiddleware.expensesByDate);

router.post('/expenses-by-daterange/:startDate&:endDate', verification.verifyToken, expenseMiddleware.expensesByDateRange);

module.exports = router;
