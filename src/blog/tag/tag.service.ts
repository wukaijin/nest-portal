/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-20 13:02:08
 * @FilePath: /nest-portal/src/blog/tag/tag.service.ts
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepo: Repository<Tag>) {}

  create(createTagDto: CreateTagDto) {
    return this.tagRepo.save(createTagDto);
  }

  findAll() {
    return this.tagRepo.find({ order: { updateAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.tagRepo.findOne({ where: { id } });
  }

  findByIds(ids: string[]) {
    return this.tagRepo.findBy({ id: In(ids) });
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    return this.tagRepo.update(id, updateTagDto);
  }

  remove(id: string) {
    return this.tagRepo.delete(id);
  }
}
