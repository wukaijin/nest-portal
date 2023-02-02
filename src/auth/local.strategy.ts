/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:47:14
 * @LastEditTime: 2023-02-01 23:56:26
 * @FilePath: /nest-portal/src/auth/local.strategy.ts
 * @Description: null
 */
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'name' }) // ! import to convert field
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException('name or password error')
    }
    return user
  }
}
