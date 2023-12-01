import { IsString } from 'class-validator';

export class CreateTranslateKeyDto {
  @IsString()
  module: string;

  @IsString()
  language: string;

  @IsString()
  key: string;

  @IsString()
  value: string;
}
