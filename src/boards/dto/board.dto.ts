import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsArray, IsNotEmpty } from 'class-validator';
import { IColumnData } from '../../interfaces';

export class BoardDto implements Readonly<BoardDto> {
  @ApiProperty({required: true, description: 'Board Id'})
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({required: true, description: 'Board title'})
  @IsString({message: 'Title should be a string'})
  @IsNotEmpty()
  title: string;

  @ApiProperty({required: true, description: 'Board columns'})
  @IsArray()
  columns: IColumnData[]
}
