import { Test, TestingModule } from '@nestjs/testing';
import { ForwardController } from './forward.controller';

describe('ForwardController', () => {
  let controller: ForwardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForwardController],
    }).compile();

    controller = module.get<ForwardController>(ForwardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
