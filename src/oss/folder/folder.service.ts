/*
 * @Author: Carlos
 * @Date: 2023-05-03 15:03:23
 * @LastEditTime: 2023-08-23 10:22:37
 * @FilePath: /nest-portal/src/oss/folder/folder.service.ts
 * @Description: null
 */
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { OssBaseService } from '../oss-base.service';
import { OSS_CONFIG, OssConfig } from '../oss.const';

@Injectable()
export class FolderService extends OssBaseService {
  private readonly logger = new Logger(FolderService.name);

  constructor(@Inject(OSS_CONFIG) ossConfig: OssConfig) {
    super(ossConfig);
  }

  async getDirectory() {
    try {
      return this.generateFolderTree(this.ossConfig.dir, '');
    } catch (error) {
      this.logger.error('Failed to get directory structure', error.stack);
      throw new BadRequestException('Failed to get directory structure');
    }
  }

  async addFolder(path: string) {
    if (!path) {
      throw new BadRequestException('Path is required');
    }
    const fullPath = this.getFullPath(path);
    try {
      await fs.promises.mkdir(fullPath, { recursive: true });
      this.logger.log(`Folder created successfully: ${fullPath}`);
      return { message: 'Folder created successfully' };
    } catch (error) {
      this.logger.error(`Failed to create folder: ${fullPath}`, error.stack);
      throw new BadRequestException('Failed to create folder');
    }
  }

  async renameFolder(path: string, name: string) {
    if (!path || !name) {
      throw new BadRequestException('Path and name are required');
    }
    const oldPath = this.getFullPath(path);
    const newPath = this.getFullPath(path.replace(/[^/]+$/, name));
    try {
      await fs.promises.rename(oldPath, newPath);
      this.logger.log(`Folder renamed successfully: ${oldPath} -> ${newPath}`);
      return { message: 'Folder renamed successfully' };
    } catch (error) {
      this.logger.error(`Failed to rename folder: ${oldPath}`, error.stack);
      throw new BadRequestException('Failed to rename folder');
    }
  }

  async deleteFolder(path: string) {
    if (!path) {
      throw new BadRequestException('Path is required');
    }
    const fullPath = this.getFullPath(path);
    try {
      await fs.promises.rmdir(fullPath);
      this.logger.log(`Folder deleted successfully: ${fullPath}`);
      return { message: 'Folder deleted successfully' };
    } catch (error) {
      if (error.code === 'ENOTEMPTY') {
        throw new BadRequestException('Folder is not empty');
      }
      this.logger.error(`Failed to delete folder: ${fullPath}`, error.stack);
      throw new BadRequestException('Failed to delete folder');
    }
  }

  private async generateFolderTree(dir: string, key: string) {
    const tree = [];
    const files = await fs.promises.readdir(dir);
    console.log(files);
    for (const file of files) {
      const currentPath = path.join(dir, file);
      const currentKey = key ? `${key}/${file}` : file;
      const stat = await fs.promises.stat(currentPath);
      if (stat.isDirectory()) {
        const children = await this.generateFolderTree(currentPath, currentKey);
        // if (children && children.length) {
        tree.push({
          label: file,
          value: currentKey,
          key: currentKey,
          children,
        });
        // }
      }
    }
    return tree.length ? tree : undefined;
  }
}
