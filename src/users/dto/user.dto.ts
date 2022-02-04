import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class UserDto implements Readonly<UserDto> {
  @ApiProperty({required: true, description: 'User Id'})
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({required: true, description: 'User name'})
  @IsString({message: 'Name should be a string'})
  @IsNotEmpty()
  name: string;

  @ApiProperty({required: true, description: 'User login'})
  @IsString({message: 'Login should be a string'})
  @IsNotEmpty()
  login: string;

  @ApiProperty({required: true, description: 'User password'})
  @IsString({message: 'Password should be a string'})
  @IsNotEmpty()
  password: string;
}
