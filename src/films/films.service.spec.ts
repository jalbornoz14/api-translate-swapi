import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { TranslateKeysService } from '../translate-keys/translate-keys.service';
import { CommunService } from '../commun/commun.service';
import { BadRequestException } from '@nestjs/common';
import { TranslateKey } from '../translate-keys/entities/translate-key.entity';

describe('FilmsService', () => {
  let service: FilmsService;
  let translateKeysService: TranslateKeysService;
  let communService: CommunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: TranslateKeysService,
          useValue: {
            findKeys: jest.fn(),
          },
        },
        {
          provide: CommunService,
          useValue: {
            fechtApi: jest.fn(),
            renameKeys: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    translateKeysService =
      module.get<TranslateKeysService>(TranslateKeysService);
    communService = module.get<CommunService>(CommunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFilms', () => {
    it('should return films with translated keys', async () => {
      const language = 'es';
      const filmsApiResponse = {
        results: [
          {
            title: 'A New Hope',
            episode_id: 4,
            opening_crawl:
              "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            director: 'George Lucas',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1977-05-25',
            characters: ['https://swapi.py4e.com/api/people/1/'],
            planets: ['https://swapi.py4e.com/api/planets/1/'],
            starships: ['https://swapi.py4e.com/api/starships/2/'],
            vehicles: ['https://swapi.py4e.com/api/vehicles/4/'],
            species: ['https://swapi.py4e.com/api/species/1/'],
            created: '2014-12-10T14:23:31.880000Z',
            edited: '2014-12-20T19:49:45.256000Z',
            url: 'https://swapi.py4e.com/api/films/1/',
          },
          {
            title: 'The Empire Strikes Back',
            episode_id: 5,
            opening_crawl:
              'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
            director: 'Irvin Kershner',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1980-05-17',
            characters: ['https://swapi.py4e.com/api/people/1/'],
            planets: ['https://swapi.py4e.com/api/planets/4/'],
            starships: ['https://swapi.py4e.com/api/starships/3/'],
            vehicles: ['https://swapi.py4e.com/api/vehicles/8/'],
            species: ['https://swapi.py4e.com/api/species/1/'],
            created: '2014-12-12T11:26:24.656000Z',
            edited: '2014-12-15T13:07:53.386000Z',
            url: 'https://swapi.py4e.com/api/films/2/',
          },
        ],
      };
      const keyFilms = { title: 'titulo', episode_id: 'episodio_id' };

      jest.spyOn(communService, 'fechtApi').mockResolvedValue(filmsApiResponse);
      jest.spyOn(service, 'findKeys').mockResolvedValue(keyFilms);
      jest
        .spyOn(communService, 'renameKeys')
        .mockImplementation((film) => film);

      const result = await service.getFilms(language);

      expect(result).toEqual(filmsApiResponse);
    });
  });

  describe('getFilm', () => {
    it('should return a film with translated keys', async () => {
      const language = 'es';
      const filmId = 1;
      const filmApiResponse = {
        title: 'A New Hope',
        episode_id: 4,
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: ['https://swapi.py4e.com/api/people/1/'],
        planets: ['https://swapi.py4e.com/api/planets/1/'],
        starships: ['https://swapi.py4e.com/api/starships/2/'],
        vehicles: ['https://swapi.py4e.com/api/vehicles/4/'],
        species: ['https://swapi.py4e.com/api/species/1/'],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.py4e.com/api/films/1/',
      };
      const keyFilms = { title: 'titulo', episode_id: 'episodio_id' };

      jest.spyOn(communService, 'fechtApi').mockResolvedValue(filmApiResponse);
      jest.spyOn(service, 'findKeys').mockResolvedValue(keyFilms);
      jest
        .spyOn(communService, 'renameKeys')
        .mockImplementation((film) => film);

      const result = await service.getFilm(filmId, language);

      expect(result).toEqual(filmApiResponse);
    });

    it('should throw BadRequestException if film does not exist', async () => {
      const language = 'en';
      const filmId = 1;

      jest.spyOn(communService, 'fechtApi').mockResolvedValue(null);

      await expect(service.getFilm(filmId, language)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findKeys', () => {
    it('should return translated keys', async () => {
      const language = 'es';
      const keysApiResponse: TranslateKey[] = [
        {
          id: 1,
          module: 'films',
          key: 'episode_id',
          language: 'es',
          value: 'episodio_id',
        },
        {
          id: 2,
          module: 'films',
          key: 'title',
          language: 'es',
          value: 'titulo',
        },
      ];

      jest
        .spyOn(translateKeysService, 'findKeys')
        .mockResolvedValue(keysApiResponse);

      const result = await service.findKeys(language);

      expect(result).toEqual({ episode_id: 'episodio_id', title: 'titulo' });
    });
  });
});
