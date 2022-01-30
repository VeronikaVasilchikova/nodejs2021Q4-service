import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber } from 'class-validator';
import { TasksEntity } from '../task.entity';

export class TaskDto implements Readonly<TaskDto> {
  static id: string;
  static title: string;
  static order: number;
  static description: string;
  static userId: string = null;
  static boardId: string = null;
  static columnthis: string = null;

  constructor() {}

  @ApiProperty({required: true})
  @IsUUID()
  id: string;

  @ApiProperty({required: true})
  @IsString()
  title: string;

  @ApiProperty({required: true})
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({required: true})
  @IsString()
  userId: string;

  @ApiProperty({required: true})
  @IsString()
  boardId: string;

  @ApiProperty({required: true})
  @IsString()
  columnId: string;

  public static from(dto: TaskDto) {
    const task = new TaskDto();
    task.id = dto.id;
    task.title = dto.title;
    task.order = dto.order;
    task.description = dto.description;
    task.userId = dto.userId;
    task.boardId = dto.boardId;
    task.columnId = dto.columnId;
    return task;
  }

  public static fromEntity(entity: TasksEntity) {
    return this.from({
      id: entity.id,
      title: entity.title,
      order: entity.order,
      description: entity.description,
      userId: entity.userId,
      boardId: entity.boardId,
      columnId: entity.columnId
    });
  }

  public static toEntity() {
    const task = new TaskDto();
    task.id = this.id;
    task.title = this.title;
    task.order = this.order;
    task.description = this.description;
    task.userId = this.userId;
    task.boardId = this.boardId;
    task.columnId = this.columnthis
    return task;
  }
}
