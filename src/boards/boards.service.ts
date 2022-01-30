import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDto } from './dto/board.dto';
import { BoardsEntity } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(BoardsEntity) private readonly repo: Repository<BoardsEntity>) {}

  public async create(createBoardDto: CreateBoardDto): Promise<BoardDto> {
    const newBoard = this.repo.create(createBoardDto);
    await this.repo.save(newBoard);
    return newBoard;
  }

  public async findAll(): Promise<BoardDto[]> {
    const allBoards = await this.repo.find();
    return allBoards;
  }

  public async findOne(id: string): Promise<BoardDto> {
    const board = await this.repo.findOne({ where: { id } });
    if (!board) throw new HttpException(`Board with id=${id} not found`, 404);
    return board;
  }

  public async update(id: string, updateBoardDto: CreateBoardDto): Promise<BoardDto> {
    const boardToUpdate = await this.repo.findOne({ where: { id } });
    if (!boardToUpdate) throw new HttpException(`Board with id=${id} not found`, 404);
    const updatedBoardData = Object.assign(boardToUpdate, updateBoardDto);
    await this.repo.save(updatedBoardData);
    return updatedBoardData;
  }

  public async remove(id: string): Promise<void> {
    const boardToDelete = await this.repo.findOne({ where: { id } });
    if (!boardToDelete) throw new HttpException(`Board with id=${id} not found`, 404);
    await this.repo.delete(id);
  }
}
