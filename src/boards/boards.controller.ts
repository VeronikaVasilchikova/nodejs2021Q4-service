import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, HttpException, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDto } from './dto/board.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({summary: 'Create a new board'})
  @ApiResponse({status: 200, type: BoardDto})
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

  @ApiOperation({summary: 'Get all boards'})
  @ApiResponse({status: 200, type: [BoardDto]})
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

  @ApiOperation({summary: 'Get board by id'})
  @ApiResponse({status: 200, type: BoardDto})
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

  @ApiOperation({summary: 'Update board by id'})
  @ApiResponse({status: 200, type: BoardDto})
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

  @ApiOperation({summary: 'Delete board by id'})
  @ApiResponse({status: 204})
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
