import { Test, TestingModule } from '@nestjs/testing';
import { CommunService } from './commun.service';
import { BadRequestException } from '@nestjs/common';

describe('CommunService', () => {
  let service: CommunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunService],
    }).compile();

    service = module.get<CommunService>(CommunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('renameKeys', () => {
    it('should rename keys in an object', () => {
      const originalObject = {
        name: 'Jheff',
      };

      const keyMappings = {
        name: 'nombre',
      };

      const result = service.renameKeys(originalObject, keyMappings);

      expect(result).toEqual({
        nombre: 'Jheff',
      });
    });

    it('should handle undefined key mappings', () => {
      const originalObject = {
        name: 'Jheff',
      };

      const result = service.renameKeys(originalObject, undefined);

      expect(result).toEqual(originalObject);
    });

    it('should handle empty key mappings', () => {
      const originalObject = {
        name: 'Jheff',
      };

      const result = service.renameKeys(originalObject, {});

      expect(result).toEqual(originalObject);
    });

    it('should handle empty original object', () => {
      const originalObject = {};

      const keyMappings = {
        name: 'nombre',
      };

      const result = service.renameKeys(originalObject, keyMappings);

      expect(result).toEqual({});
    });
  });

  describe('fetchApi', () => {
    it('should fetch data from SWAPI', async () => {
      const path = 'people/1';
      const result = await service.fechtApi(path);

      expect(result).toBeDefined();
      expect(result.name).toEqual('Luke Skywalker');
    });

    it('should fetch data by id from SWAPI', async () => {
      const path = 'films/1';
      const result = await service.fechtApi(path);

      expect(result).toBeDefined();
      expect(result.title).toEqual('A New Hope');
    });

    it('should fetch data from SWAPI with query params', async () => {
      const path = 'people/?search=Luke';
      const result = await service.fechtApi(path);

      expect(result).toBeDefined();
      expect(result.count).toEqual(1);
    });

    it('should throw BadRequestException on error', async () => {
      const path = 'nonexistentpath';
      await expect(service.fechtApi(path)).rejects.toThrow(BadRequestException);
    });
  });
});
