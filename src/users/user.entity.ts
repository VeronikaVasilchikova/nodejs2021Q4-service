import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, default: 'username' })
  name: string;

  @Column({ type: 'varchar', length: 64, default: 'userlogin', unique: true })
  login: string;

  @Column({ type: 'varchar', length: 64, default: 'P@55w0rd' })
  password: string;

  /**
   * Creates a copy of the user object, but without the password field
   * @param user user object
   * @returns user object without password field
   */
  static toResponse(user: {
    id: string;
    name: string;
    login: string;
    password: string;
  }): { id: string; name: string; login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
