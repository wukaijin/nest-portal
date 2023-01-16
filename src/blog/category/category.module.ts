/*
 * @Author: Carlos
 * @Date: 2023-01-16 21:57:26
 * @LastEditTime: 2023-01-16 21:58:04
 * @FilePath: /nest-portal/src/blog/category/category.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'

@Module({
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
