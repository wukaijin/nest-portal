/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:49:16
 * @LastEditTime: 2023-05-03 15:23:08
 * @FilePath: /nest-portal/src/app.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import DatabaseModule from './typeorm/typeorm.module'
import { CategoryModule } from './blog/category/category.module'
import { TagModule } from './blog/tag/tag.module'
import { ArticleModule } from './blog/article/article.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ImageModule } from './oss/image/image.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { RolesGuard } from './role/role.guard'
import { FolderModule } from './oss/folder/folder.module'

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    TagModule,
    ArticleModule,
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
    AuthModule,
    UserModule,
    ImageModule,
    FolderModule
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
