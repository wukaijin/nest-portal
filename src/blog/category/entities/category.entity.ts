/*
 * @Author: Carlos
 * @Date: 2023-01-16 21:57:26
 * @LastEditTime: 2023-02-03 22:51:55
 * @FilePath: /nest-portal/src/blog/category/entities/category.entity.ts
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Category {
  @ApiProperty({ name: 'id', description: 'ID', required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ name: 'text', description: '文本', required: true })
  @Column({ type: 'varchar', length: 255 })
  text: string;

  @ApiProperty({ name: 'order', description: '排序号' })
  @Column({ type: 'int' })
  order: number;

  @ApiProperty({ name: 'defaultPoster', description: '默认封面' })
  @Column({ type: 'varchar', length: 255 })
  defaultPoster: string;

  @ApiProperty({ name: 'description', description: '描述' })
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ApiProperty({ name: 'belongs', description: '属于' })
  // @Column({ type: 'varchar', length: 255, nullable: true })
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'belongs', referencedColumnName: 'id' })
  belongs: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
