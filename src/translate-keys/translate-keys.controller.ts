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
import { FindAllTranslateKeyDto } from './dto/find-all-translate-key.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('translate-keys')
@ApiTags('translate-keys')
export class TranslateKeysController {
  constructor(private readonly translateKeysService: TranslateKeysService) {}

  @Post()
  create(@Body() createTranslateKeyDto: CreateTranslateKeyDto) {
    return this.translateKeysService.create(createTranslateKeyDto);
  }

  @Get()
  findAll(@Query() parmas: FindAllTranslateKeyDto) {
    const { page, limit, module, language, key } = parmas;
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
