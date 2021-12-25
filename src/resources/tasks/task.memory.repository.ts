import { v4 as uuidv4 } from 'uuid';
import Boom from '@hapi/boom';
import Task from './task.model';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';
import Logger from '../../logger';

export default class TaskMemoryRepository {
  private static tasks: Array<ITaskData> = [new Task()];

  /**
   * Returns all tasks of pointed board
   * @param boardId board identifier
   * @returns Promise resolved task array
   */
  public static getAllTasks = async (boardId: string): Promise<Array<ITaskData> | []> => TaskMemoryRepository.tasks.filter(task => task.boardId === boardId);

  /**
   * Returns an existing task based on board and task identifier
   * @param boardId board identifier
   * @param taskId task identifier
   * @returns Promise resolved existing task data or throw error with status code 404
   */
  public static getTaskById = async (boardId: string, taskId: string): Promise<ITaskData | never> => {
    const task = TaskMemoryRepository.tasks.find(taskItem => (taskItem.id === taskId) || (taskItem.boardId === boardId));
    if (!task) {
      Logger.logError('getTaskById', `Task with boardId=${boardId} and taskId=${taskId} not found`, 404);
      throw Boom.notFound(`Task with boardId=${boardId} and taskId=${taskId} not found`);
    }
    return task;
  }

  /**
   * Returns an updated task based on board and task identifier
   * @param boardId board identifier
   * @param taskId task identifier
   * @param data new task data
   * @returns Promise resolved updated task data or throw error with status code 404
   */
  public static updateTaskById = async (boardId: string, taskId: string, data: ITaskData): Promise<ITaskData | never> => {
    const taskIndex = TaskMemoryRepository.tasks.findIndex(task => (task.id === taskId) && (task.boardId === boardId));
    if (taskIndex === -1) {
      Logger.logError('updateTaskById', `Task with taskId=${taskId} and boardId=${boardId} not found`, 404);
      throw Boom.notFound(`Task with taskId=${taskId} and boardId=${boardId} not found`);
    }
    else {
      const updatedTask = {
        ...TaskMemoryRepository.tasks[taskIndex],
        ...data
      };
      TaskMemoryRepository.tasks[taskIndex] = updatedTask;
      return TaskMemoryRepository.tasks[taskIndex];
    }
  };

  /**
   * Returns an updated task after user removed
   * @param userId identifier of removed user
   * @returns Promise resolved no data or send error with status code 404
   */
  public static updateTaskByUserId = async (userId: string): Promise<void> => {
    const taskIndex = TaskMemoryRepository.tasks.findIndex(task => task.userId === userId);
    if (taskIndex === -1) {
      Logger.logError('updateTaskByUserId', `Task with userId=${userId} not found`, 404);
      Boom.notFound(`Task with userId=${userId} not found`);
    }
    else {
      TaskMemoryRepository.tasks = TaskMemoryRepository.tasks.map(item => {
        if (item.userId === userId) {
          const updatedItem = {
            ...item,
            userId: null
          };
          return updatedItem;
        }
        return item;
      });
    }
  };

  /**
   * Return a newly created task for existing board
   * @param boardId identifier of board
   * @param task new task data
   * @returns Promise resolved newly created task data
   */
  public static createTask = async (boardId: string, task: ITaskDataBasic): Promise<ITaskData> => {
    const newTask = {id: uuidv4(), ...task, boardId};
    TaskMemoryRepository.tasks.push(newTask);
    return newTask;
  };

  /**
   * Remove an existing task from database based on board or/and task identifier
   * @param boardId identifier of board
   * @param taskId identifier of task
   * @returns Promise resolved no data or send error with status code 404
   */
  public static removeTaskById = async (boardId: string, taskId?: string): Promise<void> => {
    if (!taskId) {
      const taskByBoardIdIndex = TaskMemoryRepository.tasks.findIndex(task => task.boardId === boardId);
      if (taskByBoardIdIndex === -1) {
        Logger.logError('removeTaskById', `Task with boardId=${boardId} not found`, 404);
        Boom.notFound(`Task with boardId=${boardId} not found`);
      }
      else {
        TaskMemoryRepository.tasks = TaskMemoryRepository.tasks.filter(task => task.boardId !== boardId);
      }
    }
    else {
      const taskByBoardIdTaskIdIndex = TaskMemoryRepository.tasks.findIndex(taskItem => (taskItem.id === taskId) || (taskItem.boardId === boardId));
      if (taskByBoardIdTaskIdIndex === -1) {
        Logger.logError('removeTaskById', `Task with taskId=${taskId} and boardId=${boardId} not found`, 404);
        Boom.notFound(`Task with taskId=${taskId} and boardId=${boardId} not found`);
      }
      else {
        TaskMemoryRepository.tasks = TaskMemoryRepository.tasks.filter(task => (task.id !== taskId) && (task.boardId !== boardId));
      }
    }
  };
}
