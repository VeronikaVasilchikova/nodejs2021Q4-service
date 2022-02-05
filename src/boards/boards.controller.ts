import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDto } from './dto/board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: 200, type: BoardDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body(new ValidationPipe()) createBoardDto: CreateBoardDto,
  ): Promise<BoardDto> {
    const createdBoard = await this.boardsService.create(createBoardDto);
    return createdBoard;
  }

  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: 200, type: [BoardDto] })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async findAll(): Promise<BoardDto[]> {
    const allBoards = await this.boardsService.findAll();
    return allBoards || [];
  }

  @ApiOperation({ summary: 'Get board by id' })
  @ApiResponse({ status: 200, type: BoardDto })
  @Get(':boardId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('boardId') boardId: string): Promise<BoardDto> {
    const board = await this.boardsService.findOne(boardId);
    return board;
  }

  @ApiOperation({ summary: 'Update board by id' })
  @ApiResponse({ status: 200, type: BoardDto })
  @Put(':boardId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('boardId') boardId: string,
    @Body(new ValidationPipe()) updateBoardDto: UpdateBoardDto,
  ): Promise<BoardDto> {
    const updatedBoard = await this.boardsService.update(
      boardId,
      updateBoardDto,
    );
    return updatedBoard;
  }

  @ApiOperation({ summary: 'Delete board by id' })
  @ApiResponse({ status: 204 })
  @Delete(':boardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async remove(@Param('boardId') boardId: string): Promise<void> {
    await this.boardsService.remove(boardId);
  }
}
