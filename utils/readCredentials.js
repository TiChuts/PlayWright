const fs = require("fs");

const getCredentials = () => {
  const rawData = fs.readFileSync("utils/credentials.json");
  return JSON.parse(rawData);
};

module.exports = { getCredentials };
