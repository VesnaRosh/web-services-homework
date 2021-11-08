const validation = require('../pkg/users/validate');
const users = require('../pkg/users/index');
const md5 = require('md5');


// оваа функција
const login = async (req, res) => {
    try {
        await validation(req.body, "LOGIN");
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
    try {
        req.body.password = md5(req.body.password);
        let user = await users.loginUser(req.body.email, req.body.password);
        res.status(201).send(user);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    };
};

const validate = (req, res) => {
    res.send('ok');
};

// Оваа функција
const createAccount = async (req, res) => {
    try {
        await validation(req.body);
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
    try {
        req.body.password = md5(req.body.password);
        let user = await users.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    };
};


const forgotPassword = (req, res) => {
    res.send('ok');
};

const resetPassword = (req, res) => {
    res.send('ok');
};

module.exports = {
    login,
    validate,
    createAccount,
    forgotPassword,
    resetPassword
};