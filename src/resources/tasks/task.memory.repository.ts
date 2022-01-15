import Boom from '@hapi/boom';
import { getRepository } from 'typeorm';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';
import Logger from '../../logger';
import { Tasks } from '../../entity/tasks.entities';

export default class TaskMemoryRepository {
  /**
   * Returns all tasks of pointed board
   * @param boardId board identifier
   * @returns Promise resolved task array
   */
  public static getAllTasks = async (boardId: string): Promise<Array<ITaskData> | []> => {
    const repo = getRepository(Tasks);
    const allTasks = await repo.find({ where: { boardId } });
    return allTasks;
  };

  /**
   * Returns an existing task based on board and task identifier
   * @param boardId board identifier
   * @param id task identifier
   * @returns Promise resolved existing task data or throw error with status code 404
   */
  public static getTaskById = async (boardId: string, id: string): Promise<ITaskData | never> => {
    const repo = getRepository(Tasks);
    const task = await repo.findOne({ where: { id, boardId } });
    if (!task) {
      Logger.logError('clientError', 'getTaskById', `Task with boardId=${boardId} and taskId=${id} not found`, 404);
      throw Boom.notFound(`Task with boardId=${boardId} and taskId=${id} not found`);
    }
    return task;
  }

  /**
   * Returns an updated task based on board and task identifier
   * @param boardId board identifier
   * @param id task identifier
   * @param data new task data
   * @returns Promise resolved updated task data or throw error with status code 404
   */
  public static updateTaskById = async (boardId: string, id: string, data: ITaskData): Promise<ITaskData | never> => {
    const repo = getRepository(Tasks);
    const updatedTask = await repo.findOne({ where: { boardId, id } });
    if (updatedTask !== undefined) {
      await repo.update(id, data);
      return updatedTask;
    }

      Logger.logError('clientError', 'updateTaskById', `Task with taskId=${id} and boardId=${boardId} not found`, 404);
      throw Boom.notFound(`Task with taskId=${id} and boardId=${boardId} not found`);

  };

  /**
   * Returns an updated task after user removed
   * @param userId identifier of removed user
   * @returns Promise resolved no data or send error with status code 404
   */
  public static updateTaskByUserId = async (userId: string): Promise<void> => {
    const repo = getRepository(Tasks);
    const taskByUserId = await repo.findOne({ where: { userId } });
    if (taskByUserId !== undefined) {
      await repo.update({userId}, {userId: null});
    }
    else {
      Logger.logError('clientError', 'updateTaskByUserId', `Task with userId=${userId} not found`, 404);
      Boom.notFound(`Task with userId=${userId} not found`);
    }
  };

  /**
   * Return a newly created task for existing board
   * @param boardId identifier of board
   * @param task new task data
   * @returns Promise resolved newly created task data
   */
  public static createTask = async (boardId: string, task: ITaskDataBasic): Promise<ITaskData> => {
    const repo = getRepository(Tasks);
    const newTask = repo.create({...task, boardId});
    await repo.save(newTask);
    return newTask;
  };

  /**
   * Remove an existing task from database based on board or/and task identifier
   * @param boardId identifier of board
   * @param id identifier of task
   * @returns Promise resolved no data or send error with status code 404
   */
  public static removeTaskById = async (boardId: string, id?: string): Promise<void> => {
    const repo = getRepository(Tasks);
    if (!id) {
      const taskByBoardId = await repo.findOne({ where: { boardId } });
      if (taskByBoardId !== undefined) {
        await repo.delete({ boardId });
      }
      else {
        Logger.logError('clientError', 'removeTaskById', `Task with boardId=${boardId} not found`, 404);
        Boom.notFound(`Task with boardId=${boardId} not found`);
      }

    }
    else {
      const taskByBoardIdTaskId = await repo.findOne({ where: { boardId, id } });
      if (taskByBoardIdTaskId !== undefined) {
        await repo.delete(id);
      }
      else {
        Logger.logError('clientError', 'removeTaskById', `Task with taskId=${id} and boardId=${boardId} not found`, 404);
        Boom.notFound(`Task with taskId=${id} and boardId=${boardId} not found`);
      }
    }
  };
}
