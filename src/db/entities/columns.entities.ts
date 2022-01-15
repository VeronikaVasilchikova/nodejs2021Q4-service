import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Boards } from './boards.entities';

@Entity({ name: 'columns' })
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('integer')
  order: number;

  @ManyToOne(() => Boards, { onDelete: 'CASCADE' })
  board: Boards;

  @Column('uuid')
  boardId: string;
}
