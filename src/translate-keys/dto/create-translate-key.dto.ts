import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTranslateKeyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  module: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  language: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  key: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  value: string;
}
