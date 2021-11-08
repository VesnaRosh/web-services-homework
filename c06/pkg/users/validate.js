const { Validator } = require('node-input-validator');

const UserSchemaInsert = {
  first_name: 'required|minLength:3',
  last_name: 'required|minLength:3',
  email: 'required|email',
  password: 'required|minLength:8'
};

const UserSchemaLogin = {
  email: 'required|email',
  password: 'required|minLength:8'
};


const validate = async (data, schema = 'INSERT') => {
  let sch;
  switch (schema) {
    case 'INSERT':
      sch = UserSchemaInsert;
      break;
    case 'LOGIN':
      sch = UserSchemaLogin;
      break;
  }
  let v = new Validator(data, sch);
  let e = await v.check();
  if (!e) {
    throw v.errors
  }
};

module.exports = validate;