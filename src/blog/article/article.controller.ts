/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-02-01 22:58:19
 * @FilePath: /nest-portal/src/blog/article/article.controller.ts
 * @Description:
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.articleService.findAll()
  }

  @Get('search/:keyword')
  search(@Param('keyword') keyword: string) {
    return this.articleService.search(keyword)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id)
  }

  @Get('relative/:id')
  findRelativeById(@Param('id') id: string) {
    return this.articleService.findRelativeById(id)
  }

  @Get('findByCategoryId/:id')
  findByCategoryId(@Param('id') id: string) {
    return this.articleService.findByCategoryId(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id)
  }
}
