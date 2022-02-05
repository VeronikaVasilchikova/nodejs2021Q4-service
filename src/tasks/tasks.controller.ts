import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Tasks')
@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, type: TaskDto })
  @Post(':boardId/tasks')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
  ): Promise<TaskDto> {
    const createdTask = await this.tasksService.create(boardId, createTaskDto);
    return createdTask;
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, type: [TaskDto] })
  @Get(':boardId/tasks')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async findAll(@Param('boardId') boardId: string): Promise<TaskDto[]> {
    const allTasks = await this.tasksService.findAll(boardId);
    return allTasks || [];
  }

  @ApiOperation({ summary: 'Get task by task and board ids' })
  @ApiResponse({ status: 200, type: TaskDto })
  @Get(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ): Promise<TaskDto> {
    const task = await this.tasksService.findOne(boardId, taskId);
    return task;
  }

  @ApiOperation({ summary: 'Update task by task and board ids' })
  @ApiResponse({ status: 200, type: TaskDto })
  @Put(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDto> {
    const updatedTask = await this.tasksService.update(
      boardId,
      taskId,
      updateTaskDto,
    );
    return updatedTask;
  }

  @ApiOperation({ summary: 'Delete task by task and board ids' })
  @ApiResponse({ status: 204 })
  @Delete(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ): Promise<void> {
    await this.tasksService.remove(boardId, taskId);
  }
}
