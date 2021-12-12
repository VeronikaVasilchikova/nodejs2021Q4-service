import BoardMemoryRepository from './board.memory.repository';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';

export default class BoardService {
  /**
   * Returns an array of all boards
   * @returns Promise resolved an array of all boards
   */
  public static getAllBoards = async (): Promise<Array<IBoardData> | []> => BoardMemoryRepository.getAllBoards();

  /**
   * Returns a board data based on the identifier
   * @param boardId identifier of board
   * @returns Promise resolved a board data
   */
  public static getBoardById = async (boardId: string): Promise<IBoardData | undefined> => BoardMemoryRepository.getBoardById(boardId);

  /**
   * Returns an updated board data based on identifier
   * @param boardId identifier of board
   * @param data new data for existing board
   * @returns Promise resolved an updated board data
   */
  public static updateBoardById = async (boardId: string, data: IBoardData): Promise<IBoardData> => BoardMemoryRepository.updateBoardById(boardId, data);

  /**
   * Returns a newly created board data
   * @param board new board data
   * @returns Promise resolved a newly created board data
   */
  public static createBoard = async (boardId: IBoardDataBasic): Promise<IBoardData> => BoardMemoryRepository.createBoard(boardId);

  /**
   * Remove an existing board from database based on identifier
   * @param boardId identifier of board
   * @returns Promise resolved no data
   */
  public static removeBoardById = async (boardId: string): Promise<void> => {
    BoardMemoryRepository.removeBoardById(boardId);
  };
}
