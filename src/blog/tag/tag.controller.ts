/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-02-02 15:24:41
 * @FilePath: /nest-portal/src/blog/tag/tag.controller.ts
 * @Description:
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/role/role.decorator'
import { Role } from 'src/role/role.enum'
import { Public } from 'src/auth/jwt-auth.guard'

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto)
  }

  @Get()
  @Public()
  findAll() {
    return this.tagService.findAll()
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id)
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto)
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.tagService.remove(id)
  }
}
