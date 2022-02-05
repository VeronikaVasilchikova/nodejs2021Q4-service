import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule } from '@nestjs/swagger';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Exception } from './filter/exception.filter';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    UsersModule,
    TasksModule,
    BoardsModule,
    AuthModule,
    SwaggerModule,
    FilesModule
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
