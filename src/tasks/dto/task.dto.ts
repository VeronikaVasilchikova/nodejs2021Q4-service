import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsOptional } from 'class-validator';

export class TaskDto implements Readonly<TaskDto> {
  @ApiProperty({ required: true, description: 'Task Id' })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true, description: 'Task title' })
  @IsString({ message: 'Title should be a string' })
  title: string;

  @ApiProperty({ required: true, description: 'Task order' })
  @IsNumber({}, { message: 'Order should be a number' })
  order: number;

  @ApiProperty({ description: 'Task description' })
  @IsString({ message: 'Description should be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true, description: 'Task UserId' })
  @IsString({ message: 'UserId should be a string or null' })
  @IsOptional()
  userId: string | null;

  @ApiProperty({ required: true, description: 'Task BoardId' })
  @IsString({ message: 'BoardId should be a string or null' })
  @IsOptional()
  boardId: string | null;

  @ApiProperty({ required: true, description: 'Column Id' })
  @IsString({ message: 'ColumnId should be a string or null' })
  @IsOptional()
  columnId: string | null;
}
