/*
 * @Author: Carlos
 * @Date: 2023-05-03 15:03:23
 * @LastEditTime: 2023-05-03 15:05:30
 * @FilePath: /nest-portal/src/oss/folder/folder.module.ts
 * @Description: null
 */
import { Module } from '@nestjs/common'
import { FolderService } from './folder.service'
import { FolderController } from './folder.controller'

@Module({
  controllers: [FolderController],
  providers: [FolderService]
})
export class FolderModule {}
