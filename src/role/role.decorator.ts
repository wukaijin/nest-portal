/*
 * @Author: Carlos
 * @Date: 2023-02-02 13:35:40
 * @LastEditTime: 2023-02-02 13:36:05
 * @FilePath: /nest-portal/src/role/role.decorator.ts
 * @Description: null
 */
import { SetMetadata } from '@nestjs/common'
import { Role } from './role.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
