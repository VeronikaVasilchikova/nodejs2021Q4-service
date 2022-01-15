import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcryptjs from 'bcryptjs';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 64 })
  login: string;

  @Column({ type: 'varchar', length: 64 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }

  /**
   * Creates a copy of the user object, but without the password field
   * @param {User} user user object
   * @returns {{id, name, login, string}} user object without password field
   */
  static toResponse(user: User): { id: string, name: string, login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
