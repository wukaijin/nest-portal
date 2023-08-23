/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-08-23 10:33:43
 * @FilePath: /nest-portal/src/blog/article/article.service.ts
 * @Description:
 */
import * as fs from 'fs'
import * as path from 'path'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { Tag } from '../tag/entities/tag.entity'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'
import { ArticleQuery } from './types'

const fsp = fs.promises
const dir = path.resolve(__dirname, '../../../src')
const OSS_DIR = process.env.OSS_DIR || dir

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

  findAll(query: ArticleQuery) {
    const articlesQB = this.articleRepo
      .createQueryBuilder('article')
      .select(['id', 'state', 'title', 'poster', 'description'].map(key => `article.${key}`))
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
    if (query.title) {
      articlesQB.where('article.title like :title', { title: '%' + query.title + '%' })
    }
    if (query.category) {
      articlesQB.andWhere('article.category = :category', { category: query.category })
    }
    if (query.tags && query.tags.length) {
      articlesQB.andWhere('tag.id in (:...tagIds)', { tagIds: query.tags })
    }

    return articlesQB.orderBy('article.createAt', 'DESC').getMany()
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
  async findOne(id: string) {
    const record = await this.articleRepo
      .createQueryBuilder('article')
      .select('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('category.belongs', 'belongs')
      .leftJoinAndSelect('article.tags', 'tags')
      .where({ id })
      .getOne()
    if (!record.filePath) return record
    const fileContent = await this.getContentByFilePath(record.filePath)
    if (fileContent) {
      return {
        ...record,
        content: fileContent
      }
    }
  }
  async findRelativeById(id: string) {
    const target = await this.findOne(id)
    const getTagIds = (tags: Tag[]) =>
      (tags || [])
        .map(tag => tag.id)
        .sort()
        .join(',')

    const targetTagIds = getTagIds(target.tags)
    const related = await this.articleRepo
      .createQueryBuilder('article')
      .select(['id', 'state', 'title'].map(key => `article.${key}`))
      .leftJoin('article.category', 'category')
      // .leftJoin('article.tags', 'tag')
      .leftJoinAndSelect('article.tags', 'tag')
      .where('article.category = :category', { category: target.category.id })
      .andWhere('article.id != :articleId', { articleId: target.id })
      .getMany()
    return related.filter(r => getTagIds(r.tags) === targetTagIds)
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

  async getContentByFilePath(cPath: string) {
    const fullPath = path.resolve(OSS_DIR, cPath)
    const stat = await fsp.stat(fullPath)
    if (stat) {
      const content = await fsp.readFile(fullPath)
      return content
    } else {
      return null
    }
  }
}
