import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  public async create(@Body() createBoardDto: CreateBoardDto): Promise<BoardDto> {
    const createdBoard = await this.boardsService.create(createBoardDto);
    return createdBoard;
  }

  @Get()
  public async findAll(): Promise<BoardDto[]> {
    const allBoards = await this.boardsService.findAll();
    return allBoards || [];
  }

  @Get(':boardId')
  public async findOne(@Param('boardId') boardId: string): Promise<BoardDto> {
    const board = await this.boardsService.findOne(boardId);
    return board;
  }

  @Patch(':boardId')
  public async update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: CreateBoardDto
  ): Promise<BoardDto> {
    const updatedBoard = await this.boardsService.update(boardId, updateBoardDto);
    return updatedBoard;
  }

  @Delete(':boardId')
  public async remove(@Param('boardId') boardId: string): Promise<void> {
    await this.boardsService.remove(boardId);
  }
}
