const fs = require("fs");

const getCredentials = () => {
  const rawData = fs.readFileSync("data/loginCredentials.json");
  return JSON.parse(rawData);
};

module.exports = { getCredentials };
