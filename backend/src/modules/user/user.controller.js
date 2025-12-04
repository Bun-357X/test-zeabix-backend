const userService = require("./user.service");

async function getUsers(req, res) {
  const users = await userService.getAllUsers();
  res.json(users);
}

async function addUser(req, res) {
  const newUser = await userService.createUser(req.body);
  res.json(newUser);
}

async function updateUser(req, res) {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
}

module.exports = { getUsers, addUser, updateUser };
