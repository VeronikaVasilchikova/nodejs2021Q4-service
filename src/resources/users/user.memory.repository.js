const { v4: uuidv4 } = require('uuid');

let users = [
  {
    id: uuidv4(),
    name: 'USER',
    login: 'user',
    password: 'P@55w0rd'
  }
];

const getAllUsers = async () => users;

const getUserById = async (userId) => users.find(user => user.id.toString() === userId.toString());

const updateUserById = async (userId, data) => {
  const index = users.findIndex(item => item.id.toString() === userId.toString());
  users[index] = {userId, ...data};
};

const createUser = async (user) => {
  const newUser = {id: uuidv4(), ...user};
  users.push(newUser);
};

const removeUserById = async (userId) => {
  users = users.filter(user => user.id.toString() !== userId.toString());
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  createUser,
  removeUserById
};
