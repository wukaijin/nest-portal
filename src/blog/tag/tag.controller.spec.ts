/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-17 01:43:24
 * @FilePath: /nest-portal/src/blog/tag/tag.controller.spec.ts
 * @Description:
 */
import { Test, TestingModule } from '@nestjs/testing'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'

describe('TagController', () => {
  let controller: TagController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [TagService]
    }).compile()

    controller = module.get<TagController>(TagController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
