const { Validator } = require('node-input-validator');

const CarSchemaInsert = {
  name: 'required|minLength:2',
  manufacturer: 'required|minLength:3',
  year: 'required|minLength:4',
  class: 'required|minLength:1',
  engine: 'required|minLength:4',
  gear: 'required|minLength:4'
};

const CarSchemaUpdate = {
  name: 'minLength:2',
  manufacturer: 'minLength:3',
  year: 'minLength:4',
  class: 'minLength:1',
  engine: 'minLength:4',
  gear: 'minLength:4'
};

const validate = async (data, schema = 'INSERT') => {
  let sch;
  switch (schema) {
    case 'INSERT':
      sch = CarSchemaInsert;
      break;
    case 'UPDATE':
      sch = CarSchemaUpdate;
      break;
  }
  let v = new Validator(data, sch);
  let e = await v.check();
  if (!e) {
    throw v.errors
  }
};

module.exports = validate;