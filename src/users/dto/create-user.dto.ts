import { UserDto } from "./user.dto";

const Omit = <T, K extends keyof T>(Class: new () => T, keys: K[]): new () => Omit<T, typeof keys[number]> => Class;

export class CreateUserDto extends Omit(UserDto, ['id']) {
  constructor() {
    super();
  }
}
