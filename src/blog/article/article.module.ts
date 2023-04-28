/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-04-28 20:36:58
 * @FilePath: /nest-portal/src/blog/article/article.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './entities/article.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
