/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:40:28
 * @LastEditTime: 2023-02-01 21:46:24
 * @FilePath: /nest-portal/src/user/user.service.ts
 * @Description: null
 */
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// This should be a real class/interface representing a user entity
export interface User {
  id: string
  name: string
  password: string
}

@Injectable()
export class UserService {
  private readonly User: User[] = [
    {
      id: '1',
      name: 'carlos',
      password: '123456'
    },
    {
      id: '2',
      name: 'anonymous',
      password: '123456'
    }
  ]
  constructor(private jwtService: JwtService) {}
  async findOne(name: string): Promise<User | undefined> {
    return this.User.find(user => user.name === name)
  }
  async login(user: User) {
    const payload = { username: user.name, sub: user.id }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
