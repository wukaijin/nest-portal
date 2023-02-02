/*
 * @Author: Carlos
 * @Date: 2023-02-01 21:49:55
 * @LastEditTime: 2023-02-02 13:47:16
 * @FilePath: /nest-portal/src/auth/jwt.strategy.ts
 * @Description: null
 */
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from '../constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: any) {
    return { id: payload.id, name: payload.name }
  }
}
