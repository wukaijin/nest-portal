/*
 * @Author: Carlos
 * @Date: 2023-01-16 21:57:26
 * @LastEditTime: 2023-01-17 23:49:04
 * @FilePath: /nest-portal/src/blog/category/category.service.ts
 * @Description:
 */
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.save(createCategoryDto)
  }

  async findAll() {
    const result = await this.categoryRepo.find({
      order: { updateAt: 'DESC' },
      relations: ['belongs']
    })
    return result.map(c => ({
      ...c,
      belongs: c.belongs ? (c.belongs as unknown as Category).id : null
    }))
  }

  findOne(id: string) {
    return this.categoryRepo.findOne({ where: { id } })
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepo.update(id, updateCategoryDto)
  }

  remove(id: string) {
    return this.categoryRepo.delete(id)
  }
}
