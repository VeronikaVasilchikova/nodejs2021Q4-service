import Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import TaskMemoryRepository from './task.memory.repository';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';
import Logger from '../../logger';
import { verifyToken } from '../helpers/utils';

export default class TaskService {
  /**
   * Returns Hapi response with all existing tasks with status code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getAllTasks = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'getAllTasks', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('getAllTasks', request, '../../logs/task-logger.json', 200);
      const {boardId} = request.params;
      const allTasks = await TaskMemoryRepository.getAllTasks(<string>boardId);
      return h.response(allTasks).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'getAllTasks', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with existing task with status code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getTaskById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'getTaskById', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('getTaskById', request, '../../logs/task-logger.json', 200);
      const { boardId, taskId } = request.params;
      const task = await TaskMemoryRepository.getTaskById(<string>boardId, <string>taskId);
      return h.response(task).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'getTaskById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with updated task with status code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static updateTaskById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'updateTaskById', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('updateTaskById', request, '../../logs/task-logger.json', 200);
      const payload: ITaskData = <ITaskData>request.payload;
      const { boardId, taskId } = request.params;
      const updatedTask: ITaskData = await TaskMemoryRepository.updateTaskById(<string>boardId, <string>taskId, payload);
      return h.response(updatedTask).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'updateTaskById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with newly created task with status code 201 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static createTask = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'createTask', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('createTask', request, '../../logs/task-logger.json', 201);
      const payload = <ITaskDataBasic>request.payload;
      const {boardId} = request.params;
      const createdTask = await TaskMemoryRepository.createTask(<string>boardId, payload);
      return h.response(createdTask).header('Authorization', `Bearer ${token}`).code(201);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'createTask', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with message about deleted task with status code 204 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static removeTaskById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'removeTaskById', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('removeTaskById', request, '../../logs/task-logger.json', 204);
      const { boardId, taskId } = request.params;
      await TaskMemoryRepository.removeTaskById(<string>boardId, <string>taskId);
      return h.response('The task has been deleted').header('Authorization', `Bearer ${token}`).code(204);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'removeTaskById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }
}
