import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create.auth.dto';

@ApiTags('Authentication')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create token' })
  @ApiResponse({ status: 200 })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async login(
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<{ token: string }> {
    const token = await this.authService.login(createAuthDto);
    return { token };
  }
}
