import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Boards } from './boards.entities';

@Entity({ name: 'columns' })
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, default: 'column title' })
  title: string;

  @Column({type: 'integer', default: 1})
  order: number;

  @ManyToOne(
    () => Boards,
    board => board.columns
  )
  board: Boards;
}
