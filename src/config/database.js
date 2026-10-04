const { Sequelize } = require('sequelize');
const path = require("path")

const db_path = process.env.IS_DEVELOPMENT === 'true' ? path.resolve(process.cwd(), 'database.sqlite') : "/mnt/efs/database.sqlite"
console.log("db path -- " + db_path)

const sequelize = new Sequelize({
  dialect: 'sqlite',
  // This forces the database to live in the root directory, even when running from /dist
  storage: db_path,
  logging: false // Disables SQL query logging in the console
});

module.exports = sequelize;