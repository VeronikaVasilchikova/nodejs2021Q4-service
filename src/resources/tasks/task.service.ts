import TaskMemoryRepository from './task.memory.repository';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';

export default class TaskService {
  /**
   * Returns all tasks of pointed board
   * @param boardId board identifier
   * @returns Promise resolved task array
   */
  public static getAllTasks = (boardId: string): Promise<Array<ITaskData> | []> => TaskMemoryRepository.getAllTasks(boardId);

  /**
   * Returns an existing task based on board and task identifier
   * @param boardId board identifier
   * @param taskId task identifier
   * @returns Promise resolved existing task data
   */
  public static getTaskById = (boardId: string, taskId: string): Promise<ITaskData | undefined> => TaskMemoryRepository.getTaskById(boardId, taskId);

  /**
   * Returns an updated task based on board and task identifier
   * @param boardId board identifier
   * @param taskId task identifier
   * @param data new task data
   * @returns Promise resolved updated task data
   */
  public static updateTaskById = (boardId: string, tasksId: string, data: ITaskData): Promise<ITaskData> => TaskMemoryRepository.updateTaskById(boardId, tasksId, data);

  /**
   * Return a newly created task for existing board
   * @param boardId identifier of board
   * @param task new task data
   * @returns Promise resolved newly created task data
   */
  public static createTask = (boardId: string, task: ITaskDataBasic): Promise<ITaskData> => TaskMemoryRepository.createTask(boardId, task);

  /**
   * Remove an existing task from database based on board or/and task identifier
   * @param boardId identifier of board
   * @param taskId identifier of task
   * @returns Promise resolved no data
   */
  public static removeTaskById = (boardId: string, taskId?: string): void => {
    TaskMemoryRepository.removeTaskById(boardId, taskId);
  };
}
