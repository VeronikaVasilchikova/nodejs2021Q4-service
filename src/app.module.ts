import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    TasksModule,
    SwaggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
