import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Columns } from './columns.entity';

@Entity({ name: 'boards' })
export class Boards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 'BOARD' })
  title: string;

  @OneToMany(
    () => Columns,
    columns => columns.board,
    { cascade: true, eager: true }
  )
  columns: Columns[];

  // @PrimaryGeneratedColumn('uuid')
  // id?: string;

  // @Column()
  // title!: string;

  // @OneToMany('EntColumn', 'board', {
  //   eager: true,
  //   cascade: true,
  // })
  // columns!: EntColumn[];

  // @OneToMany('EntTask', 'boardId')
  // tasks!: EntTask[];
}
