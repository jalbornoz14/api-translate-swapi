import { Controller } from '@nestjs/common';
import { PeoplesService } from './peoples.service';

@Controller('peoples')
export class PeoplesController {
  constructor(private readonly peoplesService: PeoplesService) {}
}
