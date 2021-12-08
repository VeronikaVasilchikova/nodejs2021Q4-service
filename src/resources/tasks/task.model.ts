import { v4 as uuidv4 } from 'uuid';
import { ITaskDataOptional } from '../helpers/interfaces';

export default class Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;

  constructor({
    id = uuidv4(),
    title = 'TASK',
    order = 1,
    description = 'TASK DESCRIPTION',
    userId = uuidv4(),
    boardId = uuidv4(),
    columnId = uuidv4()
  }: ITaskDataOptional = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
