import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TranslateKeysService } from './translate-keys.service';
import { CreateTranslateKeyDto } from './dto/create-translate-key.dto';
import { UpdateTranslateKeyDto } from './dto/update-translate-key.dto';

@Controller('translate-keys')
export class TranslateKeysController {
  constructor(private readonly translateKeysService: TranslateKeysService) {}

  @Post()
  create(@Body() createTranslateKeyDto: CreateTranslateKeyDto) {
    return this.translateKeysService.create(createTranslateKeyDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('module') module: string,
    @Query('language') language: string,
    @Query('key') key: string,
  ) {
    return this.translateKeysService.findAll({
      page,
      limit,
      module,
      language,
      key,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translateKeysService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslateKeyDto: UpdateTranslateKeyDto,
  ) {
    return this.translateKeysService.update(+id, updateTranslateKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translateKeysService.remove(+id);
  }
}
