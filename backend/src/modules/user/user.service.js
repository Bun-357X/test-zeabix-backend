const User = require("./user.model");

async function getAllUsers() {
  return await User.findAll();
}

async function createUser(data) {
  return await User.create(data);
}

async function updateUser(id, data) {

  let [updatedCount, updatedUsers] = await User.update(data, {
    where: { id },
    returning: true,
  });
  if (updatedCount === 0) {
    return null;
  }
  return updatedUsers[0]
}

module.exports = { getAllUsers, createUser, updateUser };
