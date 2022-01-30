import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createBoardDto: CreateBoardDto): Promise<BoardDto> {
    const createdBoard = await this.boardsService.create(createBoardDto);
    return createdBoard;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<BoardDto[]> {
    const allBoards = await this.boardsService.findAll();
    return allBoards || [];
  }

  @Get(':boardId')
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('boardId') boardId: string): Promise<BoardDto> {
    const board = await this.boardsService.findOne(boardId);
    return board;
  }

  @Put(':boardId')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: CreateBoardDto
  ): Promise<BoardDto> {
    const updatedBoard = await this.boardsService.update(boardId, updateBoardDto);
    return updatedBoard;
  }

  @Delete(':boardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('boardId') boardId: string): Promise<void> {
    await this.boardsService.remove(boardId);
  }
}
