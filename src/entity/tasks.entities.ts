import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

  @Column({ type: 'varchar', nullable: true, length: 255, default: uuidv4() })
  userId!: string | null;

  @Column({ type: 'varchar', nullable: true, length: 255, default: uuidv4() })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true, length: 255, default: uuidv4() })
  columnId: string | null;
}
