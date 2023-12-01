import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { CommunService } from '../commun/commun.service';
import { TranslateKeysService } from '../translate-keys/translate-keys.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TranslateKey } from '../translate-keys/entities/translate-key.entity';
import { Repository } from 'typeorm';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        TranslateKeysService,
        {
          provide: getRepositoryToken(TranslateKey),
          useClass: Repository,
        },
        CommunService,
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFilms', () => {
    it('should call getFilms method of FilmsService with provided language', () => {
      const language = 'es';
      const spyGetFilms = jest.spyOn(filmsService, 'getFilms');

      controller.getFilms(language);

      expect(spyGetFilms).toHaveBeenCalledWith(language);
    });
  });

  describe('getFilm', () => {
    it('should call getFilm method of FilmsService with provided id and language', () => {
      const id = '1';
      const language = 'es';
      const spyGetFilm = jest.spyOn(filmsService, 'getFilm');

      controller.getFilm(language, id);

      expect(spyGetFilm).toHaveBeenCalledWith(+id, language);
    });
  });
});
