import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class TasksEntity extends BaseEntity {
  constructor(
    id: string,
    title: string,
    order: number,
    description: string,
    userId: string | null,
    boardId: string | null,
    columnId: string | null
  ) {
    super();
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @Column({ type: 'varchar', nullable: true })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true })
  columnId: string | null;
}
