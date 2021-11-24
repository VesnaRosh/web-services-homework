const fs = require('fs');

const configFilePath = `${__dirname}/../../config.json`;

let readConfig = fs.readFileSync(configFilePath, "utf-8");
let parsedConfig = JSON.parse(readConfig);

const get = (section) => {
  if (parsedConfig[section]) {
    return parsedConfig[section];
  }
  return null;
};

module.exports = {
  get
};