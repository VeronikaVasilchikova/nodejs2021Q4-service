import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string
  ): Promise<TaskDto> {
    const createdTask = await this.tasksService.create(boardId, createTaskDto);
    return createdTask;
  }

  @Get(':boardId/tasks')
  @HttpCode(HttpStatus.OK)
  public async findAll(@Param('boardId') boardId: string): Promise<TaskDto[]> {
    const allTasks = await this.tasksService.findAll(boardId);
    return allTasks || [];
  }

  @Get(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  public async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<TaskDto> {
    const task = await this.tasksService.findOne(boardId, taskId);
    return task;
  }

  @Put(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: CreateTaskDto
  ): Promise<TaskDto> {
    const updatedTask = await this.tasksService.update(boardId, taskId, updateTaskDto);
    return updatedTask;
  }

  @Delete(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('boardId') boardId: string): Promise<void> {
    await this.tasksService.remove(boardId);
  }
}
