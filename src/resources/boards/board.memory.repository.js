const { v4: uuidv4 } = require('uuid');

let boards = [
  {
    id: '1',
    title: 'board',
    columns: [
      {
        id: '1',
        title: 'test',
        order: 1
      }
    ]
  }
];

const getAllBoards = () => boards;

const getBoardById = (boardId) => boards.find(board => board.id.toString() === boardId.toString());

const updateBoardById = async (boardId, data) => {
  const index = await boards.findIndex(board => board.id.toString() === boardId.toString());
  const updatedBoard = {
    ...boards[index],
    ...data
  };
  boards[index] = updatedBoard;
  return boards[index];
};

const createBoard = async (board) => {
  const newBoard = {id: uuidv4(), ...board};
  await boards.push(newBoard);
  return newBoard;
};

const removeBoardById = async (boardId) => {
  boards = await boards.filter(board => board.id.toString() !== boardId.toString());
};

module.exports = {
  getAllBoards,
  getBoardById,
  updateBoardById,
  createBoard,
  removeBoardById
};
