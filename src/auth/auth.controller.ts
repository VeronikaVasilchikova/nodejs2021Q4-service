import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(@Body() userDto: UserDto): Promise<{token: string}> {
    return await this.authService.login(userDto);
  }
}
