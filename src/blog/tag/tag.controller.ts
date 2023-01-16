/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-16 22:20:18
 * @FilePath: /nest-portal/src/blog/tag/tag.controller.ts
 * @Description:
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto)
  }

  @Get()
  findAll() {
    return this.tagService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id)
  }
}
