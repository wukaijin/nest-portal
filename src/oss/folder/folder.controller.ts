/*
 * @Author: Carlos
 * @Date: 2023-05-03 15:03:23
 * @LastEditTime: 2023-05-03 19:38:10
 * @FilePath: /nest-portal/src/oss/folder/folder.controller.ts
 * @Description: null
 */
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Public } from 'src/auth/jwt-auth.guard';
import { CreateFolderDto } from './dto/create-folder.dto';
import { RenameFolderDto } from './dto/rename-folder.dto';
import { FolderService } from './folder.service';

@Controller('oss/folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  @Public()
  getDirectory() {
    return this.folderService.getDirectory();
  }

  @Post()
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.addFolder(createFolderDto.path);
  }

  @Put()
  rename(@Body() renameFolderDto: RenameFolderDto) {
    return this.folderService.renameFolder(renameFolderDto.path, renameFolderDto.name);
  }

  @Delete()
  deleteFolder(@Body('path') path: string) {
    return this.folderService.deleteFolder(path);
  }
}
