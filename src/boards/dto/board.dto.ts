import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';
import { BoardsEntity } from '../board.entity';

export class BoardDto implements Readonly<BoardDto> {
  static id: string;
  static title: string;
  static columns: { id: string; title: string; order: number; }[];

  constructor() {}

  @ApiProperty({required: true})
  @IsUUID()
  id: string;

  @ApiProperty({required: true})
  @IsString()
  title: string;

  @ApiProperty({required: true})
  columns: {id: string, title: string, order: number}[]

  public static from(dto: BoardDto) {
    const board = new BoardDto();
    board.id = dto.id;
    board.title = dto.title;
    board.columns = dto.columns;
    return board;
  }

  public static fromEntity(entity: BoardsEntity) {
    return this.from({
      id: entity.id,
      title: entity.title,
      columns: entity.columns
    });
  }

  public static toEntity() {
    const board = new BoardDto();
    board.id = this.id;
    board.title = this.title;
    board.columns = this.columns;
    return board;
  }
}
