import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsEntity } from './board.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardsEntity]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: []
})
export class BoardsModule {}
