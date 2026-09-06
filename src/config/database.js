const { Sequelize } = require('sequelize');
const path = require("path")

const sequelize = new Sequelize({
  dialect: 'sqlite',
  // This forces the database to live in the root directory, even when running from /dist
  storage: path.resolve(__dirname, "../../../database.sqlite"),
  logging: false // Disables SQL query logging in the console
});

module.exports = sequelize;