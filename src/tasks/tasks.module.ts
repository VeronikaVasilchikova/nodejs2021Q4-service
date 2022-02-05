import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksEntity } from './task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [],
})
export class TasksModule {}
