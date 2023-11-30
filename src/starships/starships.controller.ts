import { Controller } from '@nestjs/common';
import { StarshipsService } from './starships.service';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}
}
