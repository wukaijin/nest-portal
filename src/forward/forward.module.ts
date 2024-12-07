import { Module } from '@nestjs/common';
import { ForwardController } from './forward.controller';

@Module({
  controllers: [ForwardController],
})
export class ForwardModule {}
