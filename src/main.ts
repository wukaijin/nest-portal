/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:49:16
 * @LastEditTime: 2023-01-16 22:12:17
 * @FilePath: /nest-portal/src/main.ts
 * @Description:
 */
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('NestJS Portal Swagger')
    .setDescription('NestJS Portal Swagger')
    .setVersion('1.0')
    .build()
  const app = await NestFactory.create(AppModule)
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(3000)
}
bootstrap()
