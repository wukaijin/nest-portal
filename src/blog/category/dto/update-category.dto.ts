/*
 * @Author: Carlos
 * @Date: 2023-01-16 21:57:26
 * @LastEditTime: 2023-01-17 22:02:50
 * @FilePath: /nest-portal/src/blog/category/dto/update-category.dto.ts
 * @Description:
 */
// import { PartialType } from '@nestjs/swagger'
import { CreateCategoryDto } from './create-category.dto';

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
export type UpdateCategoryDto = Partial<CreateCategoryDto>;
