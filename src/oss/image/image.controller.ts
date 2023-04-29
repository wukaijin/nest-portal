import { Controller, Get, Query } from '@nestjs/common'
import { Public } from 'src/auth/jwt-auth.guard'
import { ImageService } from './image.service'

@Controller('oss/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}



  @Get('folders')
  @Public()
  getFolders() {
    return this.imageService.getFolders()
  }
  @Get('get')
  @Public()
  getImages(@Query() query: { path: string}) {
    return this.imageService.getImages(query.path)
  }
}