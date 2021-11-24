const fetch = require('node-fetch');
const config = require('../config');
const cache = {};

const api = config.get('api');

// cache
// {
//     'skopje': {
//         ts: 9874356234087,
//         data: {...}
//     },
//     'bitola': {
//         ts: 7539487593274,
//         data: {... }
//     },
// }

const city = async (cityLocation) => {
    let url = `http://api.waqi.info/feed/${cityLocation}/?token=${api.key}`;

    if (cache[cityLocation] && (cache[cityLocation].ts + 10000) > new Date().getTime()) {
        return cache[cityLocation].data;
    }

    try {
        let res = await fetch(url);
        let data = await res.json();
        cache[cityLocation] = {
            ts: new Date().getTime(),
            data
        };
        return data;
    } catch (err) {
        throw new Error(err + 'could not fetch polution data');
    }
};

module.exports = {
    city
};