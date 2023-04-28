import { Controller, Get} from '@nestjs/common'
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
}