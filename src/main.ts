import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import 'reflect-metadata';
import { AppModule } from './app.module';
import ExtraLogger from './extralogger';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('docs', app, document);
  ExtraLogger.clearAllLogFiles();
  await app.listen(PORT, () => {
    process.stdout.write(`Server is running on ${PORT} \n`);
  });
}

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error, origin: string): void => {
  ExtraLogger.logProcessError(origin, error.message);
  process.exit(1);
});

// uncomment code below to test 'uncaughtException'
// throw Error('Oops! This is uncaughtException!');

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: { message: string }): void => {
  ExtraLogger.logProcessError('unhandledRejection', reason.message);
  process.exit(1);
});

// uncomment code below to test 'unhandledRejection'
// Promise.reject(Error('Oops! This is unhandledRejection!'));

bootstrap();
