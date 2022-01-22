import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Boards } from './boards.entity';
import { Users } from './users.entity';

@Entity({ name: 'tasks' })
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, default: 'TASK' })
  title: string;

  @Column({ type: 'integer', default: 1})
  order: number;

  @Column({ type: 'varchar', length: 255, default: 'TASK DESCRIPTION' })
  description: string;

  @Column({ type: 'varchar', nullable: true, default: uuidv4() })
  userId: string | null;

  @Column({ type: 'varchar', nullable: true, default: uuidv4() })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true, default: uuidv4() })
  columnId: string | null;

  @ManyToOne(
    () => Boards,
    board => board.id
  )
  board: Boards;

  @ManyToOne(
    () => Users,
    user => user.id
  )
  user: Users;

  // @PrimaryGeneratedColumn('uuid')
  // id?: string;

  // @Column()
  // title!: string;

  // @Column()
  // order!: number;

  // @Column()
  // description!: string;

  // @Column({ type: 'uuid', nullable: true, name: 'column_id' })
  // columnId!: string | null;

  // @ManyToOne('EntBoard', 'tasks', {
  //   eager: true,
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // boardId!: EntBoard;

  // @ManyToOne('EntUser', 'tasks', {
  //   eager: true,
  //   nullable: true,
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  // })
  // userId!: EntUser | null;
}
