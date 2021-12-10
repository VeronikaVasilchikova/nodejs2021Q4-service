import BoardMemoryRepository from './board.memory.repository';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';

export default class BoardService {
  public static getAllBoards = async (): Promise<Array<IBoardData> | []> => BoardMemoryRepository.getAllBoards();

  public static getBoardById = async (boardId: string): Promise<IBoardData | undefined> => BoardMemoryRepository.getBoardById(boardId);

  public static updateBoardById = async (boardId: string, data: IBoardData): Promise<IBoardData> => BoardMemoryRepository.updateBoardById(boardId, data);

  public static createBoard = async (boardId: IBoardDataBasic): Promise<IBoardData> => BoardMemoryRepository.createBoard(boardId);

  public static removeBoardById = async (boardId: string): Promise<void> => {
    BoardMemoryRepository.removeBoardById(boardId);
  };
}
