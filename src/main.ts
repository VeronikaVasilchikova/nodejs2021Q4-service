import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('NestJS server')
      .setDescription('NestJS API description')
      .setVersion('1.0')
      .addTag('users')
      .build(),
    options
  );

  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT, () => {
    process.stdout.write(`Server is running on ${PORT} \n`);
  });
}
bootstrap();
