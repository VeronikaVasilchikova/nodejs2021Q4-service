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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserToResponseDto } from './dto/user-to-response.dto';
import { UsersEntity } from './user.entity';
import { TasksService } from '../tasks/tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: UserToResponseDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<UserToResponseDto> {
    const createdUser = await this.usersService.create(createUserDto);
    return UsersEntity.toResponse(createdUser);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserToResponseDto] })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async findAll(): Promise<UserToResponseDto[]> {
    const allUsers = await this.usersService.findAll();
    return allUsers.length
      ? allUsers.map(UsersEntity.toResponse.bind(UsersEntity))
      : [];
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserToResponseDto })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('id') id: string): Promise<UserToResponseDto> {
    const user = await this.usersService.findOne(id);
    return UsersEntity.toResponse(user);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, type: UserToResponseDto })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<UserToResponseDto> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return UsersEntity.toResponse(updatedUser);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.updateByUserId(id);
    await this.usersService.remove(id);
  }
}
