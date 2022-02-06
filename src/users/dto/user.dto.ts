import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class UserDto implements Readonly<UserDto> {
  @ApiProperty({ required: true, description: 'User Id' })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true, description: 'User name' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @ApiProperty({ required: true, description: 'User login' })
  @IsString({ message: 'Login should be a string' })
  login: string;

  @ApiProperty({ required: true, description: 'User password' })
  @IsString({ message: 'Password should be a string' })
  password: string;
}
