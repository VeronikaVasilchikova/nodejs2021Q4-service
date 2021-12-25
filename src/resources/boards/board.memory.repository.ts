import { v4 as uuidv4 } from 'uuid';
import Boom from '@hapi/boom';
import Board from './board.model';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';
import ErrorHandler from '../../error';

export default class BoardMemoryRepository {
  private static boards: Array<IBoardData> = [new Board()];

  /**
   * Returns an array of all boards
   * @returns Promise resolved an array of all boards
   */
  public static getAllBoards = async (): Promise<Array<IBoardData> | []>  => BoardMemoryRepository.boards;

  /**
   * Returns a board data based on the identifier
   * @param boardId identifier of board
   * @returns Promise resolved a board data or throw error with status code 404
   */
  public static getBoardById = async (boardId: string): Promise<IBoardData | never> => {
    const board = BoardMemoryRepository.boards.find(boardItem => boardItem.id.toString() === boardId.toString());
    if (!board) {
      ErrorHandler.handleError('getBoardById', `Board with id=${boardId} not found`, 404);
      throw Boom.notFound(`Board with id=${boardId} not found`);
    }
    return board;
  }

  /**
   * Returns an updated board data based on identifier
   * @param boardId identifier of board
   * @param data new data for existing board
   * @returns Promise resolved an updated board data or throw error with status code 404
   */
  public static updateBoardById = async (boardId: string, data: IBoardData): Promise<IBoardData | never> => {
    const index = BoardMemoryRepository.boards.findIndex(board => board.id.toString() === boardId.toString());
    if (index === -1) {
      ErrorHandler.handleError('updateBoardById', `Board with id=${boardId} not found`, 404);
      throw Boom.notFound(`Board with id=${boardId} not found`);
    }
    else {
      const updatedBoard = {
        ...BoardMemoryRepository.boards[index],
        ...data
      };
      BoardMemoryRepository.boards[index] = updatedBoard;
      return BoardMemoryRepository.boards[index];
    }
  };

  /**
   * Returns a newly created board data
   * @param board new board data
   * @returns Promise resolved a newly created board data
   */
  public static createBoard = async (board: IBoardDataBasic): Promise<IBoardData> => {
    const newBoard = {id: uuidv4(), ...board};
    BoardMemoryRepository.boards.push(newBoard);
    return newBoard;
  };

  /**
   * Remove an existing board from database based on identifier
   * @param boardId identifier of board
   * @returns Promise resolved no data or throw error with status code 404
   */
  public static removeBoardById = async (boardId: string): Promise<void | never> => {
    const index = BoardMemoryRepository.boards.findIndex(board => board.id.toString() === boardId.toString());
    if (index === -1) {
      ErrorHandler.handleError('removeBoardById', `Board with id=${boardId} not found`, 404);
      throw Boom.notFound(`Board with id=${boardId} not found`);
    }
    else {
      BoardMemoryRepository.boards = BoardMemoryRepository.boards.filter(board => board.id.toString() !== boardId.toString());
    }
  };
}
