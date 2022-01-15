import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Columns } from './columns.entities';

@Entity({ name: 'boards' })
export class Boards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 'BOARD' })
  title: string;

  @OneToMany(
    () => Columns,
    columns => columns.board,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true }
  )
  columns: Columns[];
}
