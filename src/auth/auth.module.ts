import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'my_secret_key',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
