const polution = require('../pkg/polution');

const getForCity = async (req, res) => {
    console.time('fetch');
    let data = await polution.city(req.params.city);
    console.timeEnd('fetch');
    res.status(200).send(data);
};

module.exports = {
    getForCity
};