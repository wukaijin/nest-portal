import { Provider } from '@nestjs/common';
import * as path from 'path';

export const OSS_CONFIG = 'OSS_CONFIG';

export interface OssConfig {
  dir: string;
}

const ossConfig: OssConfig = {
  dir: process.env.OSS_DIR || path.resolve(__dirname, '../../src'),
};

export const ossConstProvider: Provider = {
  provide: OSS_CONFIG,
  useValue: ossConfig,
};
