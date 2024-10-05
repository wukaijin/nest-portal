/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:40:07
 * @LastEditTime: 2023-02-01 21:57:48
 * @FilePath: /nest-portal/src/auth/auth.module.ts
 * @Description: null
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtModule } from 'src/jwt.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, jwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
