const { v4: uuidv4 } = require('uuid');

let users = [
  {
    id: '123',
    name: 'USER',
    login: 'user',
    password: 'P@55w0rd'
  }
];

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
  const newUser = await {id: uuidv4(), ...user};
  users.push(newUser);
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
