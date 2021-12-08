import TaskMemoryRepository from './task.memory.repository';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';

export default class TaskService {
  public static getAllTasks = (boardId: string): Array<ITaskData> | [] => TaskMemoryRepository.getAllTasks(boardId);

  public static getTaskById = (boardId: string, taskId: string): ITaskData | undefined => TaskMemoryRepository.getTaskById(boardId, taskId);

  public static updateTaskById = (boardId: string, tasksId: string, data: ITaskData): Promise<ITaskData> => {
    return TaskMemoryRepository.updateTaskById(boardId, tasksId, data);
  };

  public static createTask = (boardId: string, task: ITaskDataBasic): Promise<ITaskData> => TaskMemoryRepository.createTask(boardId, task);

  public static removeTaskById = (boardId: string, taskId?: string): void => {
    TaskMemoryRepository.removeTaskById(boardId, taskId);
  };
}
