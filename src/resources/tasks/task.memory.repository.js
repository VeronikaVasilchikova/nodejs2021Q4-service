const { v4: uuidv4 } = require('uuid');

let tasks = [
  {
    id: '1',
    title: 'TASK',
    order: 1,
    description: 'TASK DESCRIPTION',
    userId: '123',
    boardId: '1',
    columnId: '2'
  }
];

const getAllTasks = (boardId) => tasks.filter(task => task.boardId === boardId);

const getTaskById = (boardId, taskId) => tasks.find(task => (task.id === taskId) || (task.boardId === boardId));

const updateTaskById = async (boardId, taskId, data) => {
  const taskIndex = await tasks.findIndex(task => (task.id === taskId) && (task.boardId === boardId));
  const updatedTask = {
    ...tasks[taskIndex],
    ...data
  };
  tasks[taskIndex] = updatedTask;
  return tasks[taskIndex];
};

const updateTaskByUserId = (userId) => {
  tasks = tasks.map(item => {
    if (item.userId === userId) {
      const updatedItem = {
        ...item,
        userId: null
      };
      return updatedItem;
    }
    return item;
  })
};

const createTask = async (boardId, task) => {
  const newTask = {id: uuidv4(), ...task, boardId};
  await tasks.push(newTask);
  return newTask;
};

const removeTaskById = async (boardId, taskId) => {
  if (!taskId) {
    tasks = await tasks.filter(task => task.boardId !== boardId);
  }
  else {
    tasks = await tasks.filter(task => (task.id !== taskId) && (task.boardId !== boardId));
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  updateTaskById,
  updateTaskByUserId,
  createTask,
  removeTaskById
};
