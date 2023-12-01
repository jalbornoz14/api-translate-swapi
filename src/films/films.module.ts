import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TranslateKeysModule } from '../translate-keys/translate-keys.module';
import { CommunModule } from '../commun/commun.module';

@Module({
  controllers: [FilmsController],
  imports: [TranslateKeysModule, CommunModule],
  providers: [FilmsService],
})
export class FilmsModule {}
