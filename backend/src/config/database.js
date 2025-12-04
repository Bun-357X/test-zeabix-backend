const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log("SQLite Connected"))
    .catch(err => console.error("Connection Error:", err));

module.exports = sequelize;