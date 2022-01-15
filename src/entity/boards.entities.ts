import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Columns } from './columns.entities';

@Entity({ name: 'boards' })
export class Boards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @OneToMany(
    () => Columns,
    column => column.board,
    { onDelete: 'CASCADE', cascade: true, eager: true }
  )
  columns: Columns[];
}
