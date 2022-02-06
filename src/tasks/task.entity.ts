import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BoardsEntity } from '../boards/board.entity';
import { UsersEntity } from '../users/user.entity';

@Entity({ name: 'tasks' })
export class TasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, default: 'TASK' })
  title: string;

  @Column({ type: 'integer', default: 1 })
  order: number;

  @Column({ type: 'varchar', length: 255, default: 'TASK DESCRIPTION' })
  description: string;

  @ManyToOne(() => UsersEntity, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  @Column({ type: 'varchar', nullable: true, default: null })
  userId: string | null;

  @ManyToOne(() => BoardsEntity, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  @Column({ type: 'varchar', nullable: true, default: null })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  columnId: string | null;
}
