import { PartialType } from '@nestjs/swagger';
import { CreateTranslateKeyDto } from './create-translate-key.dto';

export class UpdateTranslateKeyDto extends PartialType(CreateTranslateKeyDto) {}
