const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();

const getBoardById = (boardId) => boardsRepo.getBoardById(boardId);

const updateBoardById = (boardId, data) => boardsRepo.updateBoardById(boardId, data);

const createBoard = (boardId) => boardsRepo.createBoard(boardId);

const removeBoardById = (boardId) => boardsRepo.removeBoardById(boardId);

module.exports = {
  getAllBoards,
  getBoardById,
  updateBoardById,
  createBoard,
  removeBoardById
};
