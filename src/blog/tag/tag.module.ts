/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-16 22:20:34
 * @FilePath: /nest-portal/src/blog/tag/tag.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'

@Module({
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
