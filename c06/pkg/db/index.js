const mongoose = require('mongoose');
const config = require('../config');

const dbConfig = config.get("db");

let username = dbConfig.username;
let password = dbConfig.password;
let dbname = dbConfig.dbname;
let host = dbConfig.host;

// connection string
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