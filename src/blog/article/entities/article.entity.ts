/*
 * @Author: Carlos
 * @Date: 2023-01-20 00:43:37
 * @LastEditTime: 2023-08-23 10:12:28
 * @FilePath: /nest-portal/src/blog/article/entities/article.entity.ts
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/blog/category/entities/category.entity';
import { Tag } from 'src/blog/tag/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ArticleState {
  UN_PUBLISHED,
  PUBLISHED,
}

@Entity()
export class Article {
  @ApiProperty({ name: 'id', description: 'ID', required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ name: 'text', description: '标题', required: true })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ name: 'poster', description: '封面' })
  @Column({ type: 'varchar', length: 255 })
  poster: string;

  @ApiProperty({ name: 'description', description: '描述' })
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ApiProperty({ name: 'tags', description: '标签' })
  @ManyToMany(() => Tag, t => t.articles)
  @JoinTable()
  tags: Tag[];

  @ApiProperty({ name: 'category', description: '分类', required: true })
  @ManyToOne(() => Category, c => c.id)
  category: Category;

  @ApiProperty({ name: 'content', description: '内容', required: true })
  @Column({ type: 'longtext' })
  content: string;

  @ApiProperty({ name: 'content', description: 'md 文件路径', required: false })
  @Column({ type: 'longtext' })
  filePath?: string;

  @ApiProperty({ name: 'state', description: '状态 [0/1]', required: true })
  @Column({ type: 'int', default: 0 })
  state: ArticleState; // 0 | 1

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
