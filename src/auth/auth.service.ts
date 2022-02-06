import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { CreateAuthDto } from './dto/create.auth.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login(user: CreateAuthDto): Promise<string> {
    const validatedUser = await this.validateUser(user);
    return this.generateToken(validatedUser);
  }

  private async generateToken(user: UserDto): Promise<string> {
    const payload = { id: user.id, login: user.login };
    return await this.jwtService.sign(payload);
  }

  private async validateUser(userDto: CreateAuthDto) {
    const user = await this.userService.findOneByLogin(userDto.login);
    const isUserValid = await bcryptjs.compare(userDto.password, user.password);
    if (isUserValid) return user;
    throw new UnauthorizedException('Forbidden! Incorrect password!');
  }
}
