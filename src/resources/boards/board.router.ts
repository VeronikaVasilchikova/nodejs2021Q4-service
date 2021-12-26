import boardRouterOptions from './board.router.options';

const boardRouter = {
  getAllBoards: {
    method: 'GET',
    path: '/boards',
    options: boardRouterOptions.getAllBoards
  },
  getBoardById: {
    method: 'GET',
    path: '/boards/{boardId}',
    options: boardRouterOptions.getBoard
  },
  updateBoardById: {
    method: 'PUT',
    path: '/boards/{boardId}',
    options: boardRouterOptions.updateBoard
  },
  createBoard: {
    method: 'POST',
    path: '/boards',
    options: boardRouterOptions.createBoard
  },
  deleteBoardById: {
    method: 'DELETE',
    path: '/boards/{boardId}',
    options: boardRouterOptions.deleteBoard
  }
}

export default boardRouter;
