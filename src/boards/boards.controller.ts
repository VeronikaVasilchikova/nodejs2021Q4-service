import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, HttpException, Req, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDto } from './dto/board.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  public async create(@Body() createBoardDto: CreateBoardDto): Promise<BoardDto> {
    try {
      const createdBoard = await this.boardsService.create(createBoardDto);
      return createdBoard;
    }
    catch(error) {
      throw new HttpException('Bad implementation', 500);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async findAll(): Promise<BoardDto[]> {
    try {
      const allBoards = await this.boardsService.findAll();
      return allBoards || [];
    }
    catch(error) {
      throw new HttpException('Bad implementation', 500);
    }
  }

  @Get(':boardId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('boardId') boardId: string): Promise<BoardDto> {
    try {
      const board = await this.boardsService.findOne(boardId);
      return board;
    }
    catch(error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Bad implementation', 500);
    }
  }

  @Put(':boardId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: CreateBoardDto
  ): Promise<BoardDto> {
    try {
      const updatedBoard = await this.boardsService.update(boardId, updateBoardDto);
      return updatedBoard;
    }
    catch(error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Bad implementation', 500);
    }
  }

  @Delete(':boardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async remove(@Param('boardId') boardId: string): Promise<void> {
    try {
      await this.boardsService.remove(boardId);
    }
    catch(error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Bad implementation', 500);
    }
  }
}
