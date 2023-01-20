/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-01-20 14:00:48
 * @FilePath: /nest-portal/src/blog/article/article.service.ts
 * @Description:
 */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private readonly articleRepo: Repository<Article>) {}
  async create(createArticleDto: CreateArticleDto) {
    const tagsIds = createArticleDto.tags
    return this.articleRepo.save({ ...createArticleDto, tags: tagsIds.map(t => ({ id: t })) })
  }

  findAll() {
    return this.articleRepo.find({
      order: {
        updateAt: 'DESC'
      },
      relations: ['category', 'tags']
    })
  }

  findOne(id: string) {
    return this.articleRepo.findOne({
      where: { id },
      relations: ['category', 'tags']
    })
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const tagsIds = updateArticleDto.tags
    return this.articleRepo.save({ ...updateArticleDto, tags: tagsIds.map(t => ({ id: t })) })
  }

  remove(id: string) {
    return this.articleRepo.delete(id)
  }
}
