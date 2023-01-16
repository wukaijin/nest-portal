/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:49:16
 * @LastEditTime: 2023-01-17 00:56:35
 * @FilePath: /nest-portal/src/app.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CatController } from './cat.controller'
import { AppService } from './app.service'
import { CategoryModule } from './blog/category/category.module'
import { TagModule } from './blog/tag/tag.module'
import TypeormModule from './typeorm/typeorm.module'

@Module({
  imports: [CategoryModule, TagModule, TypeormModule],
  controllers: [AppController, CatController],
  providers: [AppService]
})
export class AppModule {}
