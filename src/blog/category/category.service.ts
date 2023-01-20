/*
 * @Author: Carlos
 * @Date: 2023-01-16 21:57:26
 * @LastEditTime: 2023-01-20 13:14:25
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
    return this.categoryRepo.find({
      order: {
        order: 'DESC',
        updateAt: 'DESC'
      },
      relations: ['belongs']
    })
  }

  findOne(id: string) {
    return this.categoryRepo.findOne({ where: { id }, relations: ['belongs'] })
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepo.update(id, updateCategoryDto)
  }

  remove(id: string) {
    return this.categoryRepo.delete(id)
  }
}
