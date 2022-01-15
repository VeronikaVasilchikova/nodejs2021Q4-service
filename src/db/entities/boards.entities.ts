import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'boards' })
export class BoardsEntity extends BaseEntity {
  constructor(
    id: string,
    title: string,
    columns: string[]
  ) {
    super();
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ array: true })
  columns: string[];
}
