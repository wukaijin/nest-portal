/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-01-20 10:37:33
 * @FilePath: /nest-portal/src/blog/article/dto/update-article.dto.ts
 * @Description:
 */
import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
