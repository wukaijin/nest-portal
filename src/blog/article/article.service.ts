/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-01-24 16:43:05
 * @FilePath: /nest-portal/src/blog/article/article.service.ts
 * @Description:
 */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'

const LIST_KEYS: (keyof Article)[] = [
  'id',
  'description',
  'state',
  'poster',
  'title',
  'category',
  'tags'
]

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private readonly articleRepo: Repository<Article>) {}
  async create(createArticleDto: CreateArticleDto) {
    const tagsIds = createArticleDto.tags
    return this.articleRepo.save({
      ...createArticleDto,
      category: { id: createArticleDto.category },
      tags: tagsIds.map(t => ({ id: t }))
    })
  }

  findAll() {
    return this.articleRepo.find({
      order: {
        updateAt: 'DESC'
      },
      relations: ['category', 'tags'],
      select: LIST_KEYS
    })
  }

  search(keyword: string) {
    return this.articleRepo.find({
      where: {
        title: Like(`%${keyword}%`)
      },
      relations: ['category'],
      order: {
        updateAt: 'DESC'
      },
      select: LIST_KEYS
    })
  }
  findByCategoryId(id: string) {
    return this.articleRepo.find({
      relations: {
        category: true,
        tags: true
      },
      where: {
        category: { id }
      },
      select: LIST_KEYS
    })
  }
  findOne(id: string) {
    return this.articleRepo
      .createQueryBuilder('article')
      .select('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('category.belongs', 'belongs')
      .leftJoinAndSelect('article.tags', 'tags')
      .where({ id })
      .getOne()
  }
  async findRelativeById(id: string) {
    const target = await this.findOne(id)
    const cates = await this.articleRepo
      .createQueryBuilder('article')
      .select(['id', 'state', 'title'].map(key => `article.${key}`))
      .leftJoin('article.category', 'category')
      .leftJoin('article.tags', 'tag')
      .where('article.category = :category', { category: target.category.id })
      .andWhere('article.id != :articleId', { articleId: target.id })
      .andWhere('tag.id in (:...tagIds)', { tagIds: target.tags.map(t => t.id) })
      .getMany()
    return cates
  }
  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const tagsIds = updateArticleDto.tags
    return this.articleRepo.save({
      ...updateArticleDto,
      category: { id: updateArticleDto.category },
      tags: tagsIds.map(t => ({ id: t }))
    })
  }

  remove(id: string) {
    return this.articleRepo.delete(id)
  }
}
