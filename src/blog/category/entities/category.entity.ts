/*
 * @Author: Carlos
 * @Date: 2023-01-16 21:57:26
 * @LastEditTime: 2023-01-17 23:05:30
 * @FilePath: /nest-portal/src/blog/category/entities/category.entity.ts
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'

@Entity()
export class Category {
  @ApiProperty({ name: 'id', description: 'ID', required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ name: 'text', description: '文本', required: true })
  @Column({ type: 'varchar', length: 255 })
  text: string

  @ApiProperty({ name: 'defaultPoster', description: '默认封面' })
  @Column({ type: 'varchar', length: 255 })
  defaultPoster: string

  @ApiProperty({ name: 'belongs', description: '属于' })
  // @Column({ type: 'varchar', length: 255, nullable: true })
  @OneToOne(() => Category)
  @JoinColumn({ name: 'belongs', referencedColumnName: 'id' })
  belongs: string

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date
}
