import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly repo: Repository<TasksEntity>,
  ) {}

  public async create(
    boardId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    const newTask = this.repo.create({ ...createTaskDto, boardId });
    await this.repo.save(newTask);
    return newTask;
  }

  public async findAll(boardId: string): Promise<TaskDto[]> {
    const allTasks = await this.repo.find({ where: { boardId } });
    return allTasks;
  }

  public async findOne(boardId: string, id: string): Promise<TaskDto | never> {
    const taskItem = await this.repo.findOne({ where: { boardId, id } });
    if (!taskItem)
      throw new HttpException(
        `Task with boardId=${boardId} and id=${id} not found`,
        404,
      );
    return taskItem;
  }

  public async update(
    boardId: string,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDto | never> {
    const taskToUpdate = await this.repo.findOne({ where: { boardId, id } });
    if (!taskToUpdate)
      throw new HttpException(
        `Task with boardId=${boardId} and id=${id} not found`,
        404,
      );
    await this.repo.update(id, updateTaskDto);
    const updatedTask = await this.repo.findOne({ where: { boardId, id } });
    if (!updatedTask)
      throw new HttpException(
        `Task with boardId=${boardId} and id=${id} not found`,
        404,
      );
    return updatedTask;
  }

  public async remove(boardId: string, id?: string): Promise<void | never> {
    if (!id) {
      const taskByBoardId = await this.repo.findOne({ where: { boardId } });
      if (!taskByBoardId)
        throw new HttpException(`Task with boardId=${boardId} not found`, 404);
      await this.repo.delete({ boardId });
    } else {
      const taskByBoardIdTaskId = await this.repo.findOne({
        where: { boardId, id },
      });
      if (!taskByBoardIdTaskId)
        throw new HttpException(
          `Task with boardId=${boardId} and id=${id} not found`,
          404,
        );
      await this.repo.delete(id);
    }
  }
}
