import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { OssConfig } from './oss.const';

@Injectable()
export class OssBaseService {
  constructor(protected readonly ossConfig: OssConfig) {}

  protected async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(path.resolve(this.ossConfig.dir, filePath));
      return true;
    } catch {
      return false;
    }
  }

  protected getFullPath(relativePath: string): string {
    return path.resolve(this.ossConfig.dir, relativePath);
  }
}
