const User = require("../user/user.model");

async function checkSQLite() {
  try {
    await User.findAll();
    return { status: true , error: {}};
  } catch (e) {
    return { status: false, error: e.message };
  }
}

module.exports = { checkSQLite};