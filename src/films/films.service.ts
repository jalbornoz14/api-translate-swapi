import { BadRequestException, Injectable } from '@nestjs/common';
import { TranslateKeysService } from '../translate-keys/translate-keys.service';
import { Films } from './films.interface';
import { CommunService } from '../commun/commun.service';

@Injectable()
export class FilmsService {
  constructor(
    private readonly translateKeysService: TranslateKeysService,
    private readonly communService: CommunService,
  ) {}

  async getFilms(language = 'en'): Promise<Films> {
    const films = await this.communService.fechtApi('films');
    const keyFilms = await this.findKeys(language);

    const newKeys = films.results.map((film: object) => {
      return this.communService.renameKeys(film, keyFilms);
    });

    films.results = newKeys;

    return films;
  }

  async getFilm(id: number, language = 'en'): Promise<object> {
    const film = await this.communService.fechtApi(`films/${id}`);

    if (!film) {
      throw new BadRequestException('La pelicula no existe');
    }

    const keyFilms = await this.findKeys(language);

    return this.communService.renameKeys(film, keyFilms);
  }

  async findKeys(language: string): Promise<object> {
    const filmsTranslate = await this.translateKeysService.findKeys(
      'films',
      language,
    );

    const keys = {};

    filmsTranslate.map((keysFilms) => {
      keys[keysFilms.key] = keysFilms.value;
    });

    return keys;
  }
}
