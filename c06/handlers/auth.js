const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('../pkg/users/validate');
const user = require('../pkg/users');
const config = require('../pkg/config');
const mailer = require('../pkg/mailer');

const jwtConfig = config.get('security');

// оваа функција
const login = async (req, res) => {
    try {
        await validator(req.body, 'LOGIN');
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }

    try {
        let u = await user.getByEmail(req.body.email);
        if (!u) {
            return res.status(400).send('Bad request');
        }
        if (!bcrypt.compareSync(req.body.password, u.password)) {
            return res.status(400).send('Bad request. Wrong password');
        }
        // create JWT
        let token = jwt.sign({
            uid: u._id,
            email: u.email,
            full_name: `${u.first_name} ${u.last_name}`,
            exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000)
        }, jwtConfig.secret);
        res.status(200).send(token);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const validate = (req, res) => {
    res.status(200).send('ok');
};

// Оваа функција
const createAccount = async (req, res) => {
    try {
        await validator(req.body, 'CREATE');
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }

    try {
        let data = req.body;
        data.password = bcrypt.hashSync(data.password);
        let u = await user.create(data);
        await mailer.sendMail(
            [u.email],
            'WELCOME',
            {
                name: `${u.first_name}\n${u.last_name}`,
                first_name: u.first_name,
                last_name: u.last_name
            });
        return res.status(201).send(u);
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).send('Bad request. Email already in use');
        }
        return res.status(500).send('Internal server error');
    }
};

const forgotPassword = (req, res) => {
    res.send('ok');
};

const resetPassword = (req, res) => {
    res.send('ok');
};

const renew = (req, res) => {
    let token = jwt.sign({
        uid: req.user.uid,
        email: req.user.email,
        full_name: req.user.full_name,
        exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000)
    }, jwtConfig.secret);
    res.status(200).send(token);
};


module.exports = {
    login,
    validate,
    createAccount,
    forgotPassword,
    resetPassword,
    renew
};

/*

JSON WEB Token (JWT)

header.payload.signature

+.2,5.7


*/