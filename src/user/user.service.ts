/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:40:28
 * @LastEditTime: 2023-02-02 13:40:22
 * @FilePath: /nest-portal/src/user/user.service.ts
 * @Description: null
 */
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role } from 'src/role/role.enum'

// This should be a real class/interface representing a user entity
export interface User {
  id: string
  name: string
  password: string
  roles: Role[]
}

@Injectable()
export class UserService {
  private readonly User: User[] = [
    {
      id: '1',
      name: 'carlos',
      password: '123456',
      roles: [Role.Admin]
    },
    {
      id: '2',
      name: 'anonymous',
      password: '123456',
      roles: [Role.Anonymous]
    }
  ]
  constructor(private jwtService: JwtService) {}
  async findOne(name: string): Promise<User | undefined> {
    return this.User.find(user => user.name === name)
  }
  async login(user: User) {
    const payload = { name: user.name, id: user.id, roles: user.roles }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
