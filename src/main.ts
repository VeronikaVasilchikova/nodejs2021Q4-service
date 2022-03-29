import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import ExtraLogger from './extralogger';

async function bootstrap(useFastify: string | undefined) {
  const PORT = process.env.PORT || 4000;
  const options: SwaggerDocumentOptions = { deepScanRoutes: true };
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API documentation')
    .setVersion('1.0')
    .build();
  if (useFastify === 'fastify') {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    app.enableCors();
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs', app, document);
    ExtraLogger.clearAllLogFiles();
    await app.listen(PORT, '0.0.0.0', () => {
      process.stdout.write(`Server is running on ${PORT} based on fastify \n`);
    });
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs', app, document);
    ExtraLogger.clearAllLogFiles();
    await app.listen(PORT, '0.0.0.0', () => {
      process.stdout.write(`Server is running on ${PORT} based on express \n`);
    });
  }
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

bootstrap(process.env.USE_FASTIFY);
