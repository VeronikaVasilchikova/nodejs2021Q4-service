import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserToResponseDto } from './dto/user-to-response.dto';
import { UsersEntity } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserToResponseDto> {
    const createdUser = await this.usersService.create(createUserDto);
    return UsersEntity.toResponse(createdUser);
  }

  @Get()
  public async findAll(): Promise<UserToResponseDto[]> {
    const allUsers = await this.usersService.findAll();
    return allUsers.length ? allUsers.map(UsersEntity.toResponse.bind(UsersEntity)) : [];
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<UserToResponseDto> {
    const user = await this.usersService.findOne(id);
    return UsersEntity.toResponse(user);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserToResponseDto> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return UsersEntity.toResponse(updatedUser);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    // TaskMemoryRepository.updateTaskByUserId(<string>userId);
    await this.usersService.remove(id);
  }
}
