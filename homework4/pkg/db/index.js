const mongoose = require('mongoose');

let username = 'dev';
let password = '2xOCUXoTz0OTMe6T';
let dbname = 'semosdb';
let host = 'cluster0.0nscr.mongodb.net';

let dsn = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(
  dsn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      return console.log('Could not connect to DB:', err);
    }
    console.log('Successfully connected to db');
  }
);