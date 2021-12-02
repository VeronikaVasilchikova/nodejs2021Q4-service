const usersRepo = require('./user.memory.repository');

const getAllUsers = () => usersRepo.getAllUsers();

const getUserById = (userId) => usersRepo.getUserById(userId);

const updateUserById = (userId, data) => usersRepo.updateUserById(userId, data);

const createUser = (user) => usersRepo.createUser(user);

const removeUserById = (userId) => usersRepo.removeUserById(userId);

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  createUser,
  removeUserById
};
