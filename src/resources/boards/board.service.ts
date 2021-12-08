import BoardMemoryRepository from './board.memory.repository';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';

export default class BoardService {
  public static getAllBoards = (): Array<IBoardData> | []=> BoardMemoryRepository.getAllBoards();

  public static getBoardById = (boardId: string): IBoardData | undefined => BoardMemoryRepository.getBoardById(boardId);

  public static updateBoardById = (boardId: string, data: IBoardData): Promise<IBoardData> => BoardMemoryRepository.updateBoardById(boardId, data);

  public static createBoard = (boardId: IBoardDataBasic): Promise<IBoardData> => BoardMemoryRepository.createBoard(boardId);

  public static removeBoardById = (boardId: string): void => {
    BoardMemoryRepository.removeBoardById(boardId);
  };
}
