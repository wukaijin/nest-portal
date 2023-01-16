/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-17 02:08:51
 * @FilePath: /nest-portal/src/blog/tag/dto/create-tag.dto.ts
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger'

export class CreateTagDto {
  @ApiProperty({ name: 'text', description: '文本', required: true })
  text: string

  @ApiProperty({ name: 'color', description: '颜色', required: true })
  color: string
}
