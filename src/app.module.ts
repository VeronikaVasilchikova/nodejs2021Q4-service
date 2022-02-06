import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule } from '@nestjs/swagger';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Exception } from './filter/exception.filter';
import { FilesModule } from './files/files.module';
import { UsersEntity } from './users/user.entity';
import { TasksEntity } from './tasks/task.entity';
import { BoardsEntity } from './boards/board.entity';
import { ColumnsEntity } from './boards/columns.entity';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    BoardsModule,
    AuthModule,
    SwaggerModule,
    FilesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([
      UsersEntity,
      BoardsEntity,
      TasksEntity,
      ColumnsEntity,
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      logging: true,
      synchronize: false,
      entities: ['dist/src/**/*.entity.js'],
      migrations: ['dist/src/migration/*.js'],
      cli: {
        migrationsDir: 'dist/src/migration',
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: Exception,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
