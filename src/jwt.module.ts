/*
 * @Author: Carlos
 * @Date: 2023-02-01 17:49:15
 * @LastEditTime: 2023-02-02 01:44:10
 * @FilePath: /nest-portal/src/jwt.module.ts
 * @Description: null
 */
import { jwtConstants } from 'src/auth/constants'
import { JwtModule } from '@nestjs/jwt'

export const jwtModule = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '60s' }
})
