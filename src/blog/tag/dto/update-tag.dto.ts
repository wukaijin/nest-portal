/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-17 01:38:47
 * @FilePath: /nest-portal/src/blog/tag/dto/update-tag.dto.ts
 * @Description:
 */
import { CreateTagDto } from './create-tag.dto'

export type UpdateTagDto = Partial<CreateTagDto>
