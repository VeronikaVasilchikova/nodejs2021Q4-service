import Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import BoardMemoryRepository from './board.memory.repository';
import TaskMemoryRepository from '../tasks/task.memory.repository';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';
import Logger from '../../logger';
import { verifyToken } from '../helpers/utils';

export default class BoardService {
  /**
   * Returns Hapi response with all existing boards atus code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getAllBoards = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'getAllBoards', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('getAllBoards', request, '../../logs/board-logger.json', 200);
      const allBoards = await BoardMemoryRepository.getAllBoards();
      return h.response(allBoards).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'getAllBoards', (<Error>error).message, 500);
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
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'getBoardById', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('getBoardById', request, '../../logs/board-logger.json', 200);
      const {boardId} = request.params;
      const board = await BoardMemoryRepository.getBoardById(<string>boardId);
      return h.response(board).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'getBoardById', (<Error>error).message, 500);
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
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'getAllBoards', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('updateBoardById', request, '../../logs/board-logger.json', 200);
      const payload: IBoardData = <IBoardData>request.payload;
      const {boardId} = request.params;
      const updatedBoard: IBoardData = await BoardMemoryRepository.updateBoardById(<string>boardId, payload);
      return h.response(updatedBoard).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'updateBoardById', (<Error>error).message, 500);
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
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'createBoard', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('createBoard', request, '../../logs/board-logger.json', 201);
      const payload: IBoardDataBasic = <IBoardDataBasic>request.payload;
      const createdBoard = await BoardMemoryRepository.createBoard(payload);
      return h.response(createdBoard).header('Authorization', `Bearer ${token}`).code(201);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'createBoard', (<Error>error).message, 500);
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
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'createBoard', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('removeBoardById', request, '../../logs/board-logger.json', 204);
      const {boardId} = request.params;
      await BoardMemoryRepository.removeBoardById(<string>boardId);
      await TaskMemoryRepository.removeTaskById(<string>boardId);
      return h.response('The board has been deleted').header('Authorization', `Bearer ${token}`).code(204);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'removeBoardById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  };
}
