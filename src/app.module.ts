/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:49:16
 * @LastEditTime: 2023-02-02 13:37:31
 * @FilePath: /nest-portal/src/app.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoryModule } from './blog/category/category.module'
import { TagModule } from './blog/tag/tag.module'
import DatabaseModule from './typeorm/typeorm.module'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { ArticleModule } from './blog/article/article.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './User/User.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { RolesGuard } from './role/role.guard'

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    TagModule,
    RouterModule.register([
      {
        path: 'blog',
        module: CategoryModule
      },
      {
        path: 'blog',
        module: TagModule
      },
      {
        path: 'blog',
        module: ArticleModule
      }
    ]),
    ArticleModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
