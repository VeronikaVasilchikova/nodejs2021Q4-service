import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserToResponseDto extends OmitType(UserDto, [
  'password',
] as const) {}
