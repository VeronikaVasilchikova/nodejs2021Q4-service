import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  ValidateIf
} from 'class-validator';

export class TaskDto implements Readonly<TaskDto> {
  @ApiProperty({required: true, description: 'Task Id'})
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({required: true, description: 'Task title'})
  @IsString({message: 'Title should be a string'})
  @IsNotEmpty()
  title: string;

  @ApiProperty({required: true, description: 'Task order'})
  @IsNumber({}, {message: 'Order should be a number'})
  @IsNotEmpty()
  order: number;

  @ApiProperty({description: 'Task description'})
  @IsString({message: 'Description should be a string'})
  @IsOptional()
  description?: string;

  @ApiProperty({required: true, description: 'Task UserId'})
  @IsString({message: 'UserId should be a string or null'})
  @IsNotEmpty()
  @ValidateIf((_object, value) => value !== null)
  userId: string | null;

  @ApiProperty({required: true, description: 'Task BoardId'})
  @IsString({message: 'BoardId should be a string or null'})
  @IsNotEmpty()
  @ValidateIf((_object, value) => value !== null)
  boardId: string | null;

  @ApiProperty({required: true, description: 'Column Id'})
  @IsString({message: 'ColumnId should be a string or null'})
  @IsNotEmpty()
  @ValidateIf((_object, value) => value !== null)
  columnId: string | null;
}
