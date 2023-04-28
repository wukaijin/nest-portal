/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-04-28 20:30:21
 * @FilePath: /nest-portal/src/blog/article/article.service.spec.ts
 * @Description:
 */
import { Test, TestingModule } from '@nestjs/testing'
import { ArticleService } from './article.service'

describe('ArticleService', () => {
  let service: ArticleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService]
    }).compile()

    service = module.get<ArticleService>(ArticleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
