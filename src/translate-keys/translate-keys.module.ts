import { Module } from '@nestjs/common';
import { TranslateKeysService } from './translate-keys.service';
import { TranslateKeysController } from './translate-keys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslateKey } from './entities/translate-key.entity';

@Module({
  controllers: [TranslateKeysController],
  imports: [TypeOrmModule.forFeature([TranslateKey])],
  providers: [TranslateKeysService],
  exports: [TranslateKeysService],
})
export class TranslateKeysModule {}
