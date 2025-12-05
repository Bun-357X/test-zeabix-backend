const User = require("./user.model");

async function getAllUsers() {
  return await User.findAll();
}

async function createUser(data) {
  return await User.create(data);
}

async function updateUser(id, data) {

  let updatedUsers = null;
  let updatedCount = await User.update(data, {
    where: { id }
  });
  if (updatedCount === 0) {
    return null;
  } else {
    
    updatedUsers = await User.findByPk(id);

  }
  return updatedUsers
}

module.exports = { getAllUsers, createUser, updateUser };
