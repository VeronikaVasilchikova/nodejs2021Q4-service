const tasksRepo = require('./task.memory.repository');

const getAllTasks = (boardId) => tasksRepo.getAllTasks(boardId);

const getTaskById = (boardId, taskId) => tasksRepo.getTaskById(boardId, taskId);

const updateTaskById = (boardId, tasksId, data) => tasksRepo.updateTaskById(boardId, tasksId, data);

const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);

const removeTaskById = (boardId, taskId) => {
  tasksRepo.removeTaskById(boardId, taskId);
};

module.exports = {
  getAllTasks,
  getTaskById,
  updateTaskById,
  createTask,
  removeTaskById
};
