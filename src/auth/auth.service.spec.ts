/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:40:13
 * @LastEditTime: 2023-02-01 16:58:37
 * @FilePath: /nest-portal/src/auth/auth.service.spec.ts
 * @Description: null
 */
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
