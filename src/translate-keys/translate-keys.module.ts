import { Module } from '@nestjs/common';
import { TranslateKeysService } from './translate-keys.service';
import { TranslateKeysController } from './translate-keys.controller';

@Module({
  controllers: [TranslateKeysController],
  providers: [TranslateKeysService]
})
export class TranslateKeysModule {}
