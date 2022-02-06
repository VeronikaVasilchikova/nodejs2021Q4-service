import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}

// import { forwardRef, Module } from '@nestjs/common';
// import { FileService } from './file.service';
// import { ConfigDinamicModule } from './config-dinamic.module';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from 'src/auth/auth.module';

// @Module({
//   imports: [
//     forwardRef(() => AuthModule),
//     ConfigModule.forRoot({
//       envFilePath: `.${process.env.NODE_ENV}.env`,
//     }),
//   ],
//   controllers: [
//     new ConfigDinamicModule(process.env.USE_FASTIFY).controllerFile(),
//   ],
//   providers: [FileService],
// })
// export class FileModule {}
