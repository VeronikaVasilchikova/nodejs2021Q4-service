const { v4: uuidv4 } = require('uuid');

let tasks = [
  {
    id: '1',
    title: 'TASK',
    order: 1,
    description: 'TASK DESCRIPTION',
    userId: '2',
    boardId: '2',
    columnId: '2'
  }
];

const getAllTasks = (boardId) => tasks.filter(task => task.boardId.toString() === boardId.toString());

const getTaskById = (boardId, taskId) => tasks.find(task => (task.id.toString() === taskId.toString()) && (task.boardId.toString() !== boardId.toString()));

const updateTaskById = async (boardId, taskId, data) => {
  const taskIndex = await tasks.findIndex(task => (task.id.toString() === taskId.toString()) && (task.boardId.toString() !== boardId.toString()));
  const updatedTask = {
    ...tasks[taskIndex],
    ...data
  };
  tasks[taskIndex] = updatedTask;
  return tasks[taskIndex];
};

const updateTaskByUserId = (userId) => {
  tasks = tasks.map(item => {
    if (item.userId.toString() === userId.toString()) {
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
  const newTask = {id: uuidv4(), boardId, ...task};
  await tasks.push(newTask);
  return newTask;
};

const removeTaskById = async (boardId, taskId) => {
  tasks = await tasks.filter(task => (task.id.toString() !== taskId.toString()) && (task.boardId.toString() !== boardId.toString()));
};

const removeTasksBoardId = (boardId) => {
  tasks = tasks.filter(task => task.boardId.toString() !== boardId.toString());
};

module.exports = {
  getAllTasks,
  getTaskById,
  updateTaskById,
  updateTaskByUserId,
  createTask,
  removeTaskById,
  removeTasksBoardId
};
