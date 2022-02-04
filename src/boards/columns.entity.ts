import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BoardsEntity } from './board.entity';

@Entity({ name: 'columns' })
export class ColumnsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, default: 'column title' })
  title: string;

  @Column({type: 'integer', default: 1})
  order: number;

  @ManyToOne(
    () => BoardsEntity,
    board => board.columns,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  board: BoardsEntity;

  @Column()
  boardId: string;
}
