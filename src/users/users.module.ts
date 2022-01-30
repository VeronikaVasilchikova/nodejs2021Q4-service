import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: []
})
export class UsersModule {}
