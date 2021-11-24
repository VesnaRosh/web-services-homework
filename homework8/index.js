const express = require('express');
const polution = require('./handlers/polution');
const config = require('./pkg/config');

const app = config.get('app');

const api = express();

api.get('/polution/:city', polution.getForCity);

api.listen(app.port, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port ${app.port}`);
});