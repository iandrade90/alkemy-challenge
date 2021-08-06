const express = require('express');
const app = express();
const database = require('sqlite3').verbose();
const route = require('./routes');

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

let db = new database.Database('./db.sqlite3', (err) => {
  if(err){
    console.log(err.message);
  }
  console.log('Connected to the database.')
});

db.close((err) => {
  if(err){
    console.log(err.message);
  }
  console.log('Database closed');
})

app.use('/api/', route);
