/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-17 16:54:19
 * @FilePath: /nest-portal/src/blog/tag/tag.service.spec.ts
 * @Description:
 */
import { Test, TestingModule } from '@nestjs/testing'
import { TagService } from './tag.service'

describe('TagService', () => {
  let service: TagService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService]
    }).compile()

    service = module.get<TagService>(TagService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
