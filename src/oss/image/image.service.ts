/*
 * @Author: Carlos
 * @Date: 2023-04-28 20:25:41
 * @LastEditTime: 2023-05-23 16:23:07
 * @FilePath: /nest-portal/src/oss/image/image.service.ts
 * @Description: null
 */
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { OssBaseService } from '../oss-base.service';
import { OSS_CONFIG, OssConfig } from './../oss.const';
import { UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class ImageService extends OssBaseService {
  private readonly logger = new Logger(ImageService.name);

  constructor(@Inject(OSS_CONFIG) ossConfig: OssConfig) {
    super(ossConfig);
  }

  async getImages(path: string) {
    if (!path) {
      return [];
    }
    try {
      const fullPath = this.getFullPath(path);
      const files = await fs.promises.readdir(fullPath);
      return files
        .filter(file => this.isImage(file))
        .map(file => ({
          label: file,
          key: `${path}/${file}`,
        }));
    } catch (error) {
      this.logger.error(`Failed to get images from path: ${path}`, error.stack);
      throw new BadRequestException('Failed to get images');
    }
  }

  async uploadImage(file: Express.Multer.File, uploadImageDto: UploadImageDto) {
    const { name = file.originalname, path = '' } = uploadImageDto;
    const fullPath = this.getFullPath(`${path}/${name}`);

    try {
      if (await this.fileExists(fullPath)) {
        throw new BadRequestException('File already exists');
      }
      await fs.promises.writeFile(fullPath, file.buffer);
      this.logger.log(`Image uploaded successfully: ${fullPath}`);
      return { message: 'Image uploaded successfully' };
    } catch (error) {
      this.logger.error(`Failed to upload image: ${fullPath}`, error.stack);
      throw new BadRequestException('Failed to upload image');
    }
  }

  private isImage(fileName: string): boolean {
    return /\.(jpe?g|png|svg|webp|gif)$/i.test(fileName);
  }
}
