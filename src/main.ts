/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:49:16
 * @LastEditTime: 2023-01-17 13:04:53
 * @FilePath: /nest-portal/src/main.ts
 * @Description:
 */
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { WrapperInterceptor } from './wrapper/wrapper.interceptor'

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('NestJS Portal Swagger')
    .setDescription('NestJS Portal Swagger')
    .setVersion('1.0')
    .build()
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('nest-api')
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.useGlobalInterceptors(new WrapperInterceptor())
  await app.listen(3001)
}
bootstrap()
