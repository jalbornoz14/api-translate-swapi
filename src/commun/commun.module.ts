import { Module } from '@nestjs/common';
import { CommunService } from './commun.service';

@Module({
  providers: [CommunService],
  exports: [CommunService],
})
export class CommunModule {}
