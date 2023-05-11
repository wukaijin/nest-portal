/*
 * @Author: Carlos
 * @Date: 2023-05-03 15:03:23
 * @LastEditTime: 2023-05-03 19:38:10
 * @FilePath: /nest-portal/src/oss/folder/folder.controller.ts
 * @Description: null
 */
import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common'
import { Public } from 'src/auth/jwt-auth.guard'
import { FolderService } from './folder.service'

@Controller('oss/folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  @Public()
  getDirectory() {
    return this.folderService.getDirectory()
  }

  @Post()
  create(@Body('path') path: string) {
    return this.folderService.addFolder(path)
  }

  @Put()
  rename(@Body('path') path: string, @Body('name') name: string) {
    return this.folderService.renameFolder(path, name)
  }

  @Delete()
  deleteFolder(@Body('path') path: string) {
    return this.folderService.deleteFolder(path)
  }
}
