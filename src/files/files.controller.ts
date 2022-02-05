import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('file')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @ApiOperation({ summary: 'Upload a new file' })
  @ApiResponse({ status: 201 })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  public create(@UploadedFile() file: Express.Multer.File): string {
    return this.fileService.upload(file);
  }
}
