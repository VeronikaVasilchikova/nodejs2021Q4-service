import * as Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import TaskMemoryRepository from './task.memory.repository';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';
import Logger from '../../logger';

export default class TaskService {
  /**
   * Returns Hapi response with all existing tasks with status code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getAllTasks = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      Logger.logRequestInfo('getAllTasks', request, '../data/task-logger.json', 200);
      const {boardId} = request.params;
      const allTasks = await TaskMemoryRepository.getAllTasks(<string>boardId);
      return h.response(allTasks).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('getAllTasks', (<Error>error).message, 500);
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
      Logger.logRequestInfo('getTaskById', request, '../data/task-logger.json', 200);
      const { boardId, taskId } = request.params;
      const task = await TaskMemoryRepository.getTaskById(<string>boardId, <string>taskId);
      return h.response(task).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('getTaskById', (<Error>error).message, 500);
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
      Logger.logRequestInfo('updateTaskById', request, '../data/task-logger.json', 200);
      const payload: ITaskData = <ITaskData>request.payload;
      const { boardId, taskId } = request.params;
      const updatedTask: ITaskData = await TaskMemoryRepository.updateTaskById(<string>boardId, <string>taskId, payload);
      return h.response(updatedTask).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('updateTaskById', (<Error>error).message, 500);
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
      Logger.logRequestInfo('createTask', request, '../data/task-logger.json', 201);
      const payload = <ITaskDataBasic>request.payload;
      const {boardId} = request.params;
      const createdTask = await TaskMemoryRepository.createTask(<string>boardId, payload);
      return h.response(createdTask).code(201);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('createTask', (<Error>error).message, 500);
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
      Logger.logRequestInfo('removeTaskById', request, '../data/task-logger.json', 204);
      const { boardId, taskId } = request.params;
      await TaskMemoryRepository.removeTaskById(<string>boardId, <string>taskId);
      return h.response('The task has been deleted').code(204);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('removeTaskById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }
}
