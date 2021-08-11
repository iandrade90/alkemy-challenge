const express = require('express');
const router = express.Router();
const expenseMiddleware = require('../middleware/expenseMiddleware');

router.use(express.json());

router.get('/expenses/:id', expenseMiddleware.read);

router.post('/add-expense', expenseMiddleware.create);

router.delete('/remove-expense/:id', expenseMiddleware.delete);

router.put('/update-expense/:id', expenseMiddleware.update);

router.post('/expenses-by-date/:date', expenseMiddleware.expensesByDate);

router.post('/expenses-by-daterange/:startDate/:endDate', expenseMiddleware.expensesByDateRange);

module.exports = router;
