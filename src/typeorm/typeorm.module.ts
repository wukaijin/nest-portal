/*
 * @Author: Carlos
 * @Date: 2023-01-17 00:48:31
 * @LastEditTime: 2023-05-01 22:17:03
 * @FilePath: /nest-portal/src/typeorm/typeorm.module.ts
 * @Description:
 */
import { TypeOrmModule } from '@nestjs/typeorm'
// import path from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const entitiesPath = require('path').join(__dirname, '..', '/**/*.entity.{ts,.js}')
console.log('path:', entitiesPath)

export default TypeOrmModule.forRoot({
  type: 'mysql',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123456',
  host: 'localhost',
  port: 3306,
  database: 'portal',
  // entities: [entitiesPath],
  entities: [`${__dirname}/**/*.entity.{ts,.js}`],
  synchronize: true,
  retryDelay: 500,
  retryAttempts: 10,
  // keepConnectionAlive: false,
  autoLoadEntities: true // 由 forFeature 注册，自动加载实体
})
