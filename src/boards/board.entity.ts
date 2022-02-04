import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ColumnsEntity } from './columns.entity';

@Entity({ name: 'boards' })
export class BoardsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, default: 'BOARD' })
  title: string;

  @OneToMany(
    () => ColumnsEntity,
    columns => columns.board,
    { cascade: true, eager: true }
  )
  columns: ColumnsEntity[];
}
