import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, HttpException, Req } from '@nestjs/common';
import { Request } from 'express';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDto } from './dto/board.dto';
// import Logger from 'src/middleware/logger';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Req() request: Request,
    @Body() createBoardDto: CreateBoardDto
  ): Promise<BoardDto> {
    try {
      // Logger.logRequestInfo('createBoard', request, '../../logs/board-logger.json', 201);
      const createdBoard = await this.boardsService.create(createBoardDto);
      return createdBoard;
    }
    catch(error) {
      // Logger.logError('serverError', 'create boards', (<Error>error).message, 500);
      throw new HttpException('Bad implementation', 500);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(@Req() request: Request,): Promise<BoardDto[]> {
    try {
      // Logger.logRequestInfo('getAllBoards', request, '../../logs/board-logger.json', 200);
      const allBoards = await this.boardsService.findAll();
      return allBoards || [];
    }
    catch(error) {
      // Logger.logError('serverError', 'findAll boards', (<Error>error).message, 500);
      throw new HttpException('Bad implementation', 500);
    }
  }

  @Get(':boardId')
  @HttpCode(HttpStatus.OK)
  public async findOne(
    @Req() request: Request,
    @Param('boardId') boardId: string
  ): Promise<BoardDto> {
    try {
      // Logger.logRequestInfo('getBoardById', request, '../../logs/board-logger.json', 200);
      const board = await this.boardsService.findOne(boardId);
      return board;
    }
    catch(error) {
      if (error instanceof HttpException) throw error;
      // Logger.logError('serverError', 'findOne boards', (<Error>error).message, 500);
      throw new HttpException('Bad implementation', 500);
    }
  }

  @Put(':boardId')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Req() request: Request,
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: CreateBoardDto
  ): Promise<BoardDto> {
    try {
      // Logger.logRequestInfo('updateBoardById', request, '../../logs/board-logger.json', 200);
      const updatedBoard = await this.boardsService.update(boardId, updateBoardDto);
      return updatedBoard;
    }
    catch(error) {
      if (error instanceof HttpException) throw error;
      // Logger.logError('serverError', 'update boards', (<Error>error).message, 500);
      throw new HttpException('Bad implementation', 500);
    }
  }

  @Delete(':boardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(
    @Req() request: Request,
    @Param('boardId') boardId: string
  ): Promise<void> {
    try {
      // Logger.logRequestInfo('removeBoardById', request, '../../logs/board-logger.json', 204);
      await this.boardsService.remove(boardId);
    }
    catch(error) {
      if (error instanceof HttpException) throw error;
      // Logger.logError('serverError', 'remove boards', (<Error>error).message, 500);
      throw new HttpException('Bad implementation', 500);
    }
  }
}
