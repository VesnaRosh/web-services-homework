const { Validator } = require('node-input-validator');

const ArticleCreate = {
    title: 'required|minLength:3',
    content: 'required|minLength:5',
    publish_date: 'required|length:10'
};

const ArticlePartialUpdate = {
    title: 'minLength:3',
    content: 'minLength:5',
    publish_date: 'length:10'
};

const validate = async (data, schema = "CREATE") => {
    let sch;
    switch (schema) {
        case "CREATE":
            sch = ArticleCreate;
            break;
        case "PARTIAL_UPDATE":
            sch = ArticlePartialUpdate;
            break;
    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors
    }
};

module.exports = validate;