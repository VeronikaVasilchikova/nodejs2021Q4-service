import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { configService } from './config/config.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    TasksModule,
    BoardsModule,
    SwaggerModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
