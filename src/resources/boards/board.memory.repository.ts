import { v4 as uuidv4 } from 'uuid';
import Board from './board.model';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';

export default class BoardMemoryRepository {
  private static boards: Array<IBoardData> = [new Board()];

  public static getAllBoards = (): Array<IBoardData> | [] => BoardMemoryRepository.boards;

  public static getBoardById = (boardId: string): IBoardData | undefined => {
    return BoardMemoryRepository.boards.find(board => board.id.toString() === boardId.toString());
  };

  public static updateBoardById = async (boardId: string, data: IBoardData): Promise<IBoardData> => {
    const index = await BoardMemoryRepository.boards.findIndex(board => board.id.toString() === boardId.toString());
    const updatedBoard = {
      ...BoardMemoryRepository.boards[index],
      ...data
    };
    BoardMemoryRepository.boards[index] = updatedBoard;
    return BoardMemoryRepository.boards[index];
  };

  public static createBoard = async (board: IBoardDataBasic): Promise<IBoardData> => {
    const newBoard = {id: uuidv4(), ...board};
    await BoardMemoryRepository.boards.push(newBoard);
    return newBoard;
  };

  public static removeBoardById = async (boardId: string): Promise<void> => {
    BoardMemoryRepository.boards = await BoardMemoryRepository.boards.filter(board => board.id.toString() !== boardId.toString());
  };
}
