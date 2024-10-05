import { Module } from '@nestjs/common';
import { FolderController } from './folder/folder.controller';
import { FolderService } from './folder/folder.service';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { ossConstProvider } from './oss.const';

@Module({
  controllers: [ImageController, FolderController],
  providers: [ImageService, FolderService, ossConstProvider],
})
export class OssModule {}
