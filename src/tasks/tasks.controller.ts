import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  public async create(
    @Body() createUserDto: CreateTaskDto,
    @Param('boardId') boardId: string
  ): Promise<TaskDto> {
    const createdTask = await this.tasksService.create(boardId, createUserDto);
    return createdTask;
  }

  @Get(':boardId/tasks')
  public async findAll(@Param('boardId') boardId: string): Promise<TaskDto[]> {
    const allTasks = await this.tasksService.findAll(boardId);
    return allTasks || [];
  }

  @Get(':boardId/tasks/:taskId')
  public async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<TaskDto> {
    const task = await this.tasksService.findOne(boardId, taskId);
    return task;
  }

  @Patch(':boardId/tasks/:taskId')
  public async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: CreateTaskDto
  ): Promise<TaskDto> {
    const updatedUser = await this.tasksService.update(boardId, taskId, updateTaskDto);
    return updatedUser;
  }

  @Delete(':boardId/tasks/:taskId')
  public async remove(@Param('boardId') boardId: string): Promise<void> {
    await this.tasksService.remove(boardId);
  }
}
