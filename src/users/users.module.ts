import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './user.entity';
import { TasksService } from '../tasks/tasks.service';
import { TasksEntity } from '../tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TasksEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService, TasksService],
  exports: []
})
export class UsersModule {}
