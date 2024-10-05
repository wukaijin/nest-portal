/*
 * @Author: Carlos
 * @Date: 2023-04-28 20:25:53
 * @LastEditTime: 2023-05-03 20:56:26
 * @FilePath: /nest-portal/src/oss/image/image.controller.ts
 * @Description: null
 */
import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/jwt-auth.guard';
import { UploadImageDto } from './dto/upload-image.dto';
import { ImageService } from './image.service';

@Controller('oss/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('get')
  @Public()
  getImages(@Query('path') path: string) {
    return this.imageService.getImages(path);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadImageDto: UploadImageDto) {
    return this.imageService.uploadImage(file, uploadImageDto);
  }
}
