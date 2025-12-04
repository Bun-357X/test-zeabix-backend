const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt"); 

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
    const saltRounds = 10;  // hash round
    user.password = await bcrypt.hash(user.password, saltRounds);
  });


module.exports = User;
