import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.translateKeysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translateKeysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslateKeyDto: UpdateTranslateKeyDto) {
    return this.translateKeysService.update(+id, updateTranslateKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translateKeysService.remove(+id);
  }
}
