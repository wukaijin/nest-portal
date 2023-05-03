/*
 * @Author: Carlos
 * @Date: 2023-05-03 15:03:23
 * @LastEditTime: 2023-05-03 15:23:29
 * @FilePath: /nest-portal/src/oss/folder/folder.controller.ts
 * @Description: null
 */
import { Controller, Get, Post, Body, Delete } from '@nestjs/common'
import { FolderService } from './folder.service'

@Controller('oss/folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  getDirectory() {
    return this.folderService.getDirectory()
  }

  @Post()
  create(@Body('path') path: string) {
    return this.folderService.addFolder(path)
  }

  @Delete()
  deleteFolder(@Body('path') path: string) {
    return this.folderService.deleteFolder(path)
  }
}
