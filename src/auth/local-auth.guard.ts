/*
 * @Author: Carlos
 * @Date: 2023-02-01 17:09:05
 * @LastEditTime: 2023-02-01 17:09:24
 * @FilePath: /nest-portal/src/auth/local-auth.guard.ts
 * @Description: null
 */
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
