import Boom from '@hapi/boom';
import { getRepository } from 'typeorm';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';
import Logger from '../../logger';
import { Boards } from '../../entity/boards.entities';

export default class BoardMemoryRepository {
  /**
   * Returns an array of all boards
   * @returns Promise resolved an array of all boards
   */
  public static getAllBoards = async (): Promise<Array<IBoardData> | []>  => {
    const repo = getRepository(Boards);
    const allBoards = await repo.find();
    return allBoards;
  };

  /**
   * Returns a board data based on the identifier
   * @param id identifier of board
   * @returns Promise resolved a board data or throw error with status code 404
   */
  public static getBoardById = async (id: string): Promise<IBoardData | never> => {
    const repo = getRepository(Boards);
    const board = await repo.findOne({ where: { id } });
    if (!board) {
      Logger.logError('clientError', 'getBoardById', `Board with id=${id} not found`, 404);
      throw Boom.notFound(`Board with id=${id} not found`);
    }
    return board;
  }

  /**
   * Returns an updated board data based on identifier
   * @param id identifier of board
   * @param data new data for existing board
   * @returns Promise resolved an updated board data or throw error with status code 404
   */
  public static updateBoardById = async (id: string, data: IBoardData): Promise<IBoardData | never> => {
    const repo = getRepository(Boards);
    const updatedBoard = await repo.findOne({ where: { id } });
    if (updatedBoard !== undefined) {
      const updatedBoardData = Object.assign(updatedBoard, data);
      repo.save(updatedBoardData);
      return updatedBoardData;
    }
    Logger.logError('clientError', 'updateBoardById', `Board with id=${id} not found`, 404);
    throw Boom.notFound(`Board with id=${id} not found`);

  };

  /**
   * Returns a newly created board data
   * @param board new board data
   * @returns Promise resolved a newly created board data
   */
  public static createBoard = async (board: IBoardDataBasic): Promise<IBoardData> => {
    const repo = getRepository(Boards);
    const newBoard = repo.create(board);
    await repo.save(newBoard);
    return newBoard;
  };

  /**
   * Remove an existing board from database based on identifier
   * @param id identifier of board
   * @returns Promise resolved no data or throw error with status code 404
   */
  public static removeBoardById = async (id: string): Promise<void | never> => {
    const repo = getRepository(Boards);
    const deletedBoard = await repo.findOne({ where: { id } });
    if (deletedBoard !== undefined) {
      await repo.delete(id)
    }
    else {
      Logger.logError('clientError', 'removeBoardById', `Board with id=${id} not found`, 404);
      throw Boom.notFound(`Board with id=${id} not found`);
    }
  };
}
