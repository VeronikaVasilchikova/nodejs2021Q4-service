import { TaskDto } from "./task.dto";

const Omit = <T, K extends keyof T>(Class: new () => T, keys: K[]): new () => Omit<T, typeof keys[number]> => Class;

export class CreateTaskDto extends Omit(TaskDto, ['id']) {
  constructor() {
    super();
  }
}
