/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:40:28
 * @LastEditTime: 2023-02-01 17:38:26
 * @FilePath: /nest-portal/src/user/user.service.spec.ts
 * @Description: null
 */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
