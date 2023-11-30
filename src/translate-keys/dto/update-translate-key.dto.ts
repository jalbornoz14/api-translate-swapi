import { PartialType } from '@nestjs/mapped-types';
import { CreateTranslateKeyDto } from './create-translate-key.dto';

export class UpdateTranslateKeyDto extends PartialType(CreateTranslateKeyDto) {}
