import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  constructor(
    id: string,
    name: string,
    login: string,
    password: string
  ) {
    super();
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  login: string;

  @Column({ type: 'varchar' })
  password: string;
}
