/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:59:05
 * @LastEditTime: 2023-01-16 16:07:11
 * @FilePath: /nest-portal/src/cat.controller.ts
 * @Description:
 */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('/cat')
export class CatController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCat(): string {
    return 'Cats!'
  }
  @Get('one')
  findCat(@Query('id') id: number): string {
    return `${id} one cat found!`
  }
  @Post('feed/:id')
  feedCat(@Body() body: { food: string }, @Param('id') id: number) {
    return `Cat ${id} is eating ${body.food}.`
  }
}
