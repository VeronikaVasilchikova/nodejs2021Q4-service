import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repo: Repository<UsersEntity>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.repo.create(createUserDto);
    await this.repo.save(newUser);
    return newUser;
  }

  public async findAll(): Promise<UserDto[]> {
    return await this.repo.find();
  }

  public async findOne(id: string): Promise<UserDto | never> {
    const userItem = await this.repo.findOne({ where: { id } });
    if (!userItem) throw new HttpException(`User with id=${id} not found`, 404);
    return userItem;
  }

  public async findOneByLogin(login: string): Promise<UserDto | never> {
    const userItem = await this.repo.findOne({ where: { login } });
    if (!userItem)
      throw new HttpException(`User with login=${login} not found`, 404);
    return userItem;
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | never> {
    const userToUpdate = await this.repo.findOne(id);
    if (!userToUpdate)
      throw new HttpException(`User with id=${id} not found`, 404);
    await this.repo.update(id, updateUserDto);
    const updatedUser = await this.repo.findOne(id);
    if (!updatedUser)
      throw new HttpException(`User with id=${id} not found`, 404);
    return updatedUser;
  }

  public async remove(id: string): Promise<void | never> {
    const userToDelete = await this.repo.findOne({ where: { id } });
    if (!userToDelete)
      throw new HttpException(`User with id=${id} not found`, 404);
    await this.repo.delete(id);
  }
}
