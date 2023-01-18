/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:49:16
 * @LastEditTime: 2023-01-17 22:05:37
 * @FilePath: /nest-portal/src/app.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoryModule } from './blog/category/category.module'
import { TagModule } from './blog/tag/tag.module'
import DatabaseModule from './typeorm/typeorm.module'
import { RouterModule } from '@nestjs/core'

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    TagModule,
    RouterModule.register([
      {
        path: 'blog',
        module: CategoryModule
      },
      {
        path: 'blog',
        module: TagModule
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
