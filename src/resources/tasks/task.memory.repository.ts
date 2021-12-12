import { v4 as uuidv4 } from 'uuid';
import Task from './task.model';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';

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
   * @returns Promise resolved existing task data
   */
  public static getTaskById = async (boardId: string, taskId: string): Promise<ITaskData | undefined> => TaskMemoryRepository.tasks.find(task => (task.id === taskId) || (task.boardId === boardId));

  /**
   * Returns an updated task based on board and task identifier
   * @param boardId board identifier
   * @param taskId task identifier
   * @param data new task data
   * @returns Promise resolved updated task data
   */
  public static updateTaskById = async (boardId: string, taskId: string, data: ITaskData): Promise<ITaskData> => {
    const taskIndex = TaskMemoryRepository.tasks.findIndex(task => (task.id === taskId) && (task.boardId === boardId));
    const updatedTask = {
      ...TaskMemoryRepository.tasks[taskIndex],
      ...data
    };
    TaskMemoryRepository.tasks[taskIndex] = updatedTask;
    return TaskMemoryRepository.tasks[taskIndex];
  };

  /**
   * Returns an updated task after user removed
   * @param userId identifier of removed user
   * @returns Promise resolved no data
   */
  public static updateTaskByUserId = async (userId: string): Promise<void> => {
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
   * @returns Promise resolved no data
   */
  public static removeTaskById = async (boardId: string, taskId?: string): Promise<void> => {
    if (!taskId) {
      TaskMemoryRepository.tasks = TaskMemoryRepository.tasks.filter(task => task.boardId !== boardId);
    }
    else {
      TaskMemoryRepository.tasks = TaskMemoryRepository.tasks.filter(task => (task.id !== taskId) && (task.boardId !== boardId));
    }
  };
}
