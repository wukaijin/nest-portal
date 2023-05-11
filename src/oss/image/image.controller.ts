/*
 * @Author: Carlos
 * @Date: 2023-04-28 20:25:53
 * @LastEditTime: 2023-05-03 20:56:26
 * @FilePath: /nest-portal/src/oss/image/image.controller.ts
 * @Description: null
 */
import { Controller, Get, Query, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common'
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { Public } from 'src/auth/jwt-auth.guard'
import { ImageService } from './image.service'

@Controller('oss/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('get')
  @Public()
  getImages(@Query() query: { path: string }) {
    return this.imageService.getImages(query.path)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name?: string; path?: string }
  ) {
    return this.imageService.uploadImage(file, body)
  }
}
