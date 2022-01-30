import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersEntity) private readonly repo: Repository<UsersEntity>) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.repo.create(createUserDto);
    await this.repo.save(newUser);
    return newUser;
  }

  public async findAll(): Promise<UserDto[]> {
    return await this.repo.find();
  }

  public async findOne(id: string): Promise<UserDto> {
    const userItem = await this.repo.findOne({ where: { id } });
    if (userItem !== undefined) {
      return userItem;
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const userToUpdate = await this.repo.findOne(id);
    if (userToUpdate !== undefined) {
      await this.repo.update(id, updateUserDto);
      const updatedUser = await this.repo.findOne(id);
      return updatedUser;
    }
  }

  public async remove(id: string): Promise<void> {
    const deletedUser = await this.repo.findOne({ where: { id } });
    if (deletedUser !== undefined) {
      await this.repo.delete(id);
    }
  }
}
