import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('films')
@ApiTags('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('')
  getFilms(@Query('lang') language: string) {
    return this.filmsService.getFilms(language);
  }

  @Get(':id')
  getFilm(@Query('lang') language: string, @Param('id') id: string) {
    return this.filmsService.getFilm(+id, language);
  }
}
