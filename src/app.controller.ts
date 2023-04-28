/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:49:16
 * @LastEditTime: 2023-04-28 20:32:34
 * @FilePath: /nest-portal/src/app.controller.ts
 * @Description:
 */
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
