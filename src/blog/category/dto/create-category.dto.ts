/*
 * @Author: Carlos
 * @Date: 2023-01-16 21:57:26
 * @LastEditTime: 2023-01-17 17:10:18
 * @FilePath: /nest-portal/src/blog/category/dto/create-category.dto.ts
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
  @ApiProperty({ name: 'text', description: '文本', required: true })
  text: string

  @ApiProperty({ name: 'defaultPoster', description: '默认封面' })
  defaultPoster: string

  @ApiProperty({ name: 'belongs', description: '属于' })
  belongs: string
}
