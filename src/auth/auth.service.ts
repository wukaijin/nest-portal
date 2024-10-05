/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:40:13
 * @LastEditTime: 2023-02-01 17:52:50
 * @FilePath: /nest-portal/src/auth/auth.service.ts
 * @Description: null
 */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      console.log('validateUser user', user);
      return result;
    }
    return null;
  }
}
