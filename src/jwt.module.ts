/*
 * @Author: Carlos
 * @Date: 2023-02-01 17:49:15
 * @LastEditTime: 2023-02-02 13:46:49
 * @FilePath: /nest-portal/src/jwt.module.ts
 * @Description: null
 */
import { jwtConstants } from 'src/constants'
import { JwtModule } from '@nestjs/jwt'

export const jwtModule = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '600s' }
})
