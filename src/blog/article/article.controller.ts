/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-02-02 15:25:12
 * @FilePath: /nest-portal/src/blog/article/article.controller.ts
 * @Description:
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { Public } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/role/role.decorator'
import { Role } from 'src/role/role.enum'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get()
  @Public()
  findAll() {
    return this.articleService.findAll()
  }

  @Get('search/:keyword')
  @Public()
  search(@Param('keyword') keyword: string) {
    return this.articleService.search(keyword)
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id)
  }

  @Get('relative/:id')
  @Public()
  findRelativeById(@Param('id') id: string) {
    return this.articleService.findRelativeById(id)
  }

  @Get('findByCategoryId/:id')
  @Public()
  findByCategoryId(@Param('id') id: string) {
    return this.articleService.findByCategoryId(id)
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto)
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.articleService.remove(id)
  }
}
