const { v4: uuidv4 } = require('uuid');
const User = require('./user.model');

let users = [new User()];

const getAllUsers = () => users;

const getUserById = (userId) => users.find(user => user.id.toString() === userId.toString());

const updateUserById = async (userId, data) => {
  const index = await users.findIndex(item => item.id.toString() === userId.toString());
  const updatedUser = {
    ...users[index],
    ...data
  };
  users[index] = updatedUser;
  return users[index];
};

const createUser = async (user) => {
  const newUser = {id: uuidv4(), ...user};
  await users.push(newUser);
  return newUser;
};

const removeUserById = async (userId) => {
  users = await users.filter(user => user.id.toString() !== userId.toString());
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  createUser,
  removeUserById
};
