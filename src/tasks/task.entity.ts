import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
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

  @Column({ type: 'varchar', nullable: true, default: uuidv4() })
  userId: string | null;

  @Column({ type: 'varchar', nullable: true, default: uuidv4() })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true, default: uuidv4() })
  columnId: string | null;

  @ManyToOne(() => BoardsEntity, (board) => board.id, { onDelete: 'CASCADE' })
  board: BoardsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  user: UsersEntity;
}
