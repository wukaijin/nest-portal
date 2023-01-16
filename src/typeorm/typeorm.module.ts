/*
 * @Author: Carlos
 * @Date: 2023-01-17 00:48:31
 * @LastEditTime: 2023-01-17 00:56:07
 * @FilePath: /nest-portal/src/typeorm/typeorm.module.ts
 * @Description:
 */
import { TypeOrmModule } from '@nestjs/typeorm'

const TypeormModule = TypeOrmModule.forRoot({
  type: 'mysql',
  username: 'root',
  password: '123456',
  host: 'localhost',
  port: 3306,
  database: 'portal',
  entities: [`${__dirname}/**/*entity{ts,.js}`],
  synchronize: true,
  retryDelay: 500,
  retryAttempts: 10,
  autoLoadEntities: true // 由 forFeature 注册，自动加载实体
})

export default TypeormModule
