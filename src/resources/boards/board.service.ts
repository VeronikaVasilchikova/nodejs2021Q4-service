import * as Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import BoardMemoryRepository from './board.memory.repository';
import TaskMemoryRepository from '../tasks/task.memory.repository';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';
import Logger from '../../logger';

export default class BoardService {
  /**
   * Returns Hapi response with all existing boards atus code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getAllBoards = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      Logger.logRequestInfo('getAllBoards', request, '../data/board-logger.json', 200);
      const allBoards = await BoardMemoryRepository.getAllBoards();
      return h.response(allBoards).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('getAllBoards', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with existing board atus code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getBoardById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      Logger.logRequestInfo('getBoardById', request, '../data/board-logger.json', 200);
      const {boardId} = request.params;
      const board = await BoardMemoryRepository.getBoardById(<string>boardId);
      return h.response(board).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('getBoardById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with updated bord data atus code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static updateBoardById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      Logger.logRequestInfo('updateBoardById', request, '../data/board-logger.json', 200);
      const payload: IBoardData = <IBoardData>request.payload;
      const {boardId} = request.params;
      const updatedBoard: IBoardData = await BoardMemoryRepository.updateBoardById(<string>boardId, payload);
      return h.response(updatedBoard).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('updateBoardById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with newly created bord data atus code 201 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static createBoard = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      Logger.logRequestInfo('createBoard', request, '../data/board-logger.json', 201);
      const payload: IBoardDataBasic = <IBoardDataBasic>request.payload;
      const createdBoard = await BoardMemoryRepository.createBoard(payload);
      return h.response(createdBoard).code(201);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('createBoard', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with message about removed board atus code 204 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static removeBoardById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      Logger.logRequestInfo('removeBoardById', request, '../data/board-logger.json', 204);
      const {boardId} = request.params;
      await BoardMemoryRepository.removeBoardById(<string>boardId);
      await TaskMemoryRepository.removeTaskById(<string>boardId);
      return h.response('The board has been deleted').code(204);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('removeBoardById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  };
}
