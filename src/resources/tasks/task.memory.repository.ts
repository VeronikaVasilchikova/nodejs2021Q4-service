import { v4 as uuidv4 } from 'uuid';
import Task from './task.model';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';

export default class TaskMemoryRepository {
  private static tasks: Array<ITaskData> = [new Task()];

  public static getAllTasks = (boardId: string): Array<ITaskData> | [] => TaskMemoryRepository.tasks.filter(task => task.boardId === boardId);

  public static getTaskById = (boardId: string, taskId: string): ITaskData | undefined => TaskMemoryRepository.tasks.find(task => (task.id === taskId) || (task.boardId === boardId));

  public static updateTaskById = async (boardId: string, taskId: string, data: ITaskData): Promise<ITaskData> => {
    const taskIndex = await TaskMemoryRepository.tasks.findIndex(task => (task.id === taskId) && (task.boardId === boardId));
    const updatedTask = {
      ...TaskMemoryRepository.tasks[taskIndex],
      ...data
    };
    TaskMemoryRepository.tasks[taskIndex] = updatedTask;
    return TaskMemoryRepository.tasks[taskIndex];
  };

  public static updateTaskByUserId = (userId: string): void => {
    TaskMemoryRepository.tasks = TaskMemoryRepository.tasks.map(item => {
      if (item.userId === userId) {
        const updatedItem = {
          ...item,
          userId: null
        };
        return updatedItem;
      }
      return item;
    })
  };

  public static createTask = async (boardId: string, task: ITaskDataBasic): Promise<ITaskData> => {
    const newTask = {id: uuidv4(), ...task, boardId};
    await TaskMemoryRepository.tasks.push(newTask);
    return newTask;
  };

  public static removeTaskById = async (boardId: string, taskId?: string): Promise<void> => {
    if (!taskId) {
      TaskMemoryRepository.tasks = await TaskMemoryRepository.tasks.filter(task => task.boardId !== boardId);
    }
    else {
      TaskMemoryRepository.tasks = await TaskMemoryRepository.tasks.filter(task => (task.id !== taskId) && (task.boardId !== boardId));
    }
  };
}
