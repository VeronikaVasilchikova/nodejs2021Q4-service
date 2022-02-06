import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsArray } from 'class-validator';
import { IColumnData } from '../../interfaces';

export class BoardDto implements Readonly<BoardDto> {
  @ApiProperty({ required: true, description: 'Board Id' })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true, description: 'Board title' })
  @IsString({ message: 'Title should be a string' })
  title: string;

  @ApiProperty({ required: true, description: 'Board columns' })
  @IsArray()
  columns: IColumnData[];
}
