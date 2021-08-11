const express = require('express');
const app = express();
const routesUser = require('./routes/routesUser');
const routesIncome = require('./routes/routesIncome');
const routesExpense = require('./routes/routesExpense');
const database = require('./models/database');

database.sync().then(() => {
  console.log('Database ready');
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

app.use('/api/', routesUser);
app.use('/api/', routesIncome);
app.use('/api/', routesExpense);
