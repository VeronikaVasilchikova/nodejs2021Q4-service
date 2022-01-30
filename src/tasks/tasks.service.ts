import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TasksEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TasksEntity) private readonly repo: Repository<TasksEntity>) {}

  public async create(boardId: string, createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const newTask = this.repo.create({...createTaskDto, boardId});
    await this.repo.save(newTask);
    return newTask;
  }

  public async findAll(boardId: string): Promise<TaskDto[]> {
    const allTasks = await this.repo.find({ where: { boardId } });
    return allTasks;
  }

  public async findOne(boardId: string, taskId: string): Promise<TaskDto> {
    const taskItem = await this.repo.findOne({ where: { boardId, taskId } });
    if (!taskItem) throw new HttpException(`Task with boardId=${boardId} and id=${taskId} not found`, 404);
    return taskItem;
  }

  public async update(boardId: string, taskId: string, updateTaskDto: CreateTaskDto): Promise<TaskDto> {
    const taskToUpdate = await this.repo.findOne({ where: { boardId, taskId } });
    if (!taskToUpdate) throw new HttpException(`Task with boardId=${boardId} and id=${taskId} not found`, 404);
    await this.repo.update(taskId, updateTaskDto);
    const updatedTask = await this.repo.findOne({ where: { boardId, taskId } });
    return updatedTask;
  }

  public async updateByUserId(userId: string): Promise<TaskDto | void> {
    const taskByUserId = await this.repo.findOne({ where: { userId } });
    if (!taskByUserId) throw new HttpException(`Task with userId=${userId} not found`, 404);
    await this.repo.update({userId}, {userId: null});
  }

  public async remove(boardId: string, taskId?: string): Promise<void> {
    if (!taskId) {
      const taskByBoardId = await this.repo.findOne({ where: { boardId } });
      if (!taskByBoardId) throw new HttpException(`Task with boardId=${boardId} not found`, 404);
      await this.repo.delete({ boardId });
    }
    else {
      const taskByBoardIdTaskId = await this.repo.findOne({ where: { boardId, taskId } });
      if (!taskByBoardIdTaskId) throw new HttpException(`Task with boardId=${boardId} and id=${taskId} not found`, 404);
      await this.repo.delete(taskId);
    }
  }
}
