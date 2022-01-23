import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcryptjs from 'bcryptjs';
import { IUserData, IUserDataToResponse } from '../resources/helpers/interfaces';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, default: 'username' })
  name: string;

  @Column({ type: 'varchar', length: 64, default: 'userlogin' })
  login: string;

  @Column({ type: 'varchar', length: 64, default: 'P@55w0rd' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }

  /**
   * Creates a copy of the user object, but without the password field
   * @param user user object
   * @returns user object without password field
   */
  static toResponse(user: IUserData): IUserDataToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
