import { BoardDto } from "./board.dto";

const Omit = <T, K extends keyof T>(Class: new () => T, keys: K[]): new () => Omit<T, typeof keys[number]> => Class;

export class CreateBoardDto extends Omit(BoardDto, ['id']) {
  constructor() {
    super();
  }
}
