/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:49:16
 * @LastEditTime: 2023-01-16 22:02:47
 * @FilePath: /nest-portal/src/app.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CatController } from './cat.controller'
import { AppService } from './app.service'
import { CategoryModule } from './blog/category/category.module'
import { TagModule } from './blog/tag/tag.module'

@Module({
  imports: [CategoryModule, TagModule],
  controllers: [AppController, CatController],
  providers: [AppService]
})
export class AppModule {}
