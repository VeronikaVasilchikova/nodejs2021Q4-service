import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Exception } from './filter/exception.filter';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    TasksModule,
    BoardsModule,
    AuthModule,
    SwaggerModule
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: Exception
  }],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
