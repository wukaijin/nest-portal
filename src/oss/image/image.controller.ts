/*
 * @Author: Carlos
 * @Date: 2023-04-28 20:25:53
 * @LastEditTime: 2023-05-01 21:36:56
 * @FilePath: /nest-portal/src/oss/image/image.controller.ts
 * @Description: null
 */
import {
  Controller,
  Get,
  Query,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Put,
  Delete
} from '@nestjs/common'
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { Public } from 'src/auth/jwt-auth.guard'
import { ImageService } from './image.service'

@Controller('oss/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('folders')
  getFolders() {
    return this.imageService.getFolders()
  }

  @Put('folder')
  addFolder(@Body('path') path: string) {
    return this.imageService.addFolder(path)
  }

  @Delete('folder')
  deleteFolder(@Body('path') path: string) {
    return this.imageService.deleteFolder(path)
  }

  @Get('get')
  @Public()
  getImages(@Query() query: { path: string }) {
    return this.imageService.getImages(query.path)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
  }
}
