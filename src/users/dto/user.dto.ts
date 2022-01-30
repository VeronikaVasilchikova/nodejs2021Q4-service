import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';
import { UsersEntity } from '../user.entity';

export class UserDto implements Readonly<UserDto> {
  static id: string;
  static login: string;
  static password: string;

  constructor() {}

  @ApiProperty({required: true})
  @IsUUID()
  id: string;

  @ApiProperty({required: true})
  @IsString()
  name: string;

  @ApiProperty({required: true})
  @IsString()
  login: string;

  @ApiProperty({required: true})
  @IsString()
  password: string;

  public static from(dto: UserDto) {
    const user = new UserDto();
    user.id = dto.id;
    user.name = dto.name;
    user.login = dto.login;
    user.password = dto.password;
    return user;
  }

  public static fromEntity(entity: UsersEntity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      login: entity.login,
      password: entity.password
    });
  }

  public static toEntity() {
    const user = new UserDto();
    user.id = this.id;
    user.name = this.name;
    user.login = this.login;
    user.password = this.password;
    return user;
  }
}
