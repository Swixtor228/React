const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodedb", "root", "123qwe", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./user')(sequelize, Sequelize);
module.exports = db;