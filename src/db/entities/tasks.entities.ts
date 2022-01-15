import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tasks' })
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column()
  order: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  userId!: string | null;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  columnId: string | null;
}
