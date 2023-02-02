/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:40:23
 * @LastEditTime: 2023-02-01 17:50:21
 * @FilePath: /nest-portal/src/user/user.module.ts
 * @Description: null
 */
import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { jwtModule } from 'src/jwt.module'

@Module({
  imports: [jwtModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
