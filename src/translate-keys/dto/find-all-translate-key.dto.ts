import { ApiProperty } from '@nestjs/swagger';

export class FindAllTranslateKeyDto {
  @ApiProperty({ required: true })
  page?: number;

  @ApiProperty({ required: true })
  limit?: number;

  @ApiProperty({ required: false })
  module?: string;

  @ApiProperty({ required: false })
  language?: string;

  @ApiProperty({ required: false })
  key?: string;

  @ApiProperty({ required: false })
  value?: string;
}
