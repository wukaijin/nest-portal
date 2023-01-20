/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-01-20 00:44:43
 * @FilePath: /nest-portal/src/blog/article/article.controller.spec.ts
 * @Description:
 */
import { Test, TestingModule } from '@nestjs/testing'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

describe('ArticleController', () => {
  let controller: ArticleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService]
    }).compile()

    controller = module.get<ArticleController>(ArticleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
