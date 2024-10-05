/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:51:46
 * @LastEditTime: 2023-02-01 23:29:57
 * @FilePath: /nest-portal/src/user/user.controller.ts
 * @Description: null
 */
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserService } from './user.service';
import { Public } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.userService.login(req.user); // user is auto injected from the guard
  }
}
