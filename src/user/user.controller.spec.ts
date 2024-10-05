/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:51:46
 * @LastEditTime: 2023-02-01 17:38:18
 * @FilePath: /nest-portal/src/user/user.controller.spec.ts
 * @Description: null
 */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
