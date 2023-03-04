require("dotenv").config();

const config = {
  DB_URI: process.env.MONGODB_URI,
  port: process.env.PORT || 8080,
};

module.exports = config;
