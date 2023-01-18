/*
 * @Author: Carlos
 * @Date: 2023-01-16 22:00:58
 * @LastEditTime: 2023-01-17 16:43:17
 * @FilePath: /nest-portal/src/blog/tag/entities/tag.entity.ts
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Tag {
  @ApiProperty({ name: 'id', description: 'ID', required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ name: 'text', description: '文本', required: true })
  @Column({ type: 'varchar', length: 255 })
  text: string

  @ApiProperty({ name: 'color', description: '颜色', required: true })
  @Column({ type: 'char', length: 7 })
  color: string

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date
}
