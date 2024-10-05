/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-20 13:57:09
 * @FilePath: /nest-portal/src/blog/tag/tag.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
  exports: [],
})
export class TagModule {}
