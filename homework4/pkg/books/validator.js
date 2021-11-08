const { Validator } = require('node-input-validator');

const BookSchemaInsert = {
    name: 'required|minLength:3',
    author: 'required|minLength:4',
    genre: 'required|minLength:5',
    publisher: 'required|minLength:3',
    year: 'required|minLength:4',
    language: 'required|minLength:4'
};

const BookSchemaUpdate = {
    name: 'minLength:3',
    author: 'minLength:4',
    genre: 'minLength:5',
    publisher: 'minLength:3',
    year: 'minLength:4',
    language: 'minLength:4'
};

const validate = async (data, schema = 'INSERT') => {
    let sch;
    switch (schema) {
        case 'INSERT':
            sch = BookSchemaInsert;
            break;
        case 'UPDATE':
            sch = BookSchemaUpdate;
            break;
    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors
    }
};

module.exports = validate;