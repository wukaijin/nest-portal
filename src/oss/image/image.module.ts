/*
 * @Author: Carlos
 * @Date: 2023-04-28 20:24:25
 * @LastEditTime: 2023-05-03 15:02:42
 * @FilePath: /nest-portal/src/oss/image/image.module.ts
 * @Description: null
 */
import { Module } from '@nestjs/common';
import { ossConstProvider } from '../oss.const';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [],
  controllers: [ImageController],
  providers: [ImageService, ossConstProvider],
})
export class ImageModule {}
