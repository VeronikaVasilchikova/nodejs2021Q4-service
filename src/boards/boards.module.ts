import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsEntity } from './board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardsEntity])
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: []
})
export class TasksModule {}
