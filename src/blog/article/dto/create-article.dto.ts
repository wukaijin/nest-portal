/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-08-23 10:14:02
 * @FilePath: /nest-portal/src/blog/article/dto/create-article.dto.ts
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleDto {
  @ApiProperty({ name: 'text', description: '标题', required: true })
  title: string

  @ApiProperty({ name: 'poster', description: '封面' })
  poster: string

  @ApiProperty({ name: 'description', description: '描述' })
  description: string

  @ApiProperty({ name: 'content', description: '内容', required: false })
  content: string

  @ApiProperty({ name: 'content', description: 'md 文件路径', required: false })
  filePath: string

  @ApiProperty({ name: 'tags', description: '标签' })
  tags: string[]

  @ApiProperty({ name: 'category', description: '分类', required: true })
  category: string

  @ApiProperty({ name: 'state', description: '发布状态', required: true })
  state: number
}
