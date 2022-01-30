import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksEntity } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksEntity])
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: []
})
export class TasksModule {}
