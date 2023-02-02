/*
 * @Author: Carlos
 * @Date: 2023-02-01 21:59:32
 * @LastEditTime: 2023-02-01 23:23:05
 * @FilePath: /nest-portal/src/auth/jwt-auth.guard.ts
 * @Description: null
 */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err, user, info, context: ExecutionContext, status: any) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log('err', err)
    console.log('user', user)
    console.log('info', info)
    console.log('context.isAuthenticated', context)
    console.log('status', status)
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
