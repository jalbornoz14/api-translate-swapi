import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TranslateKeysController } from './translate-keys.controller';
import { TranslateKeysService } from './translate-keys.service';
import { CreateTranslateKeyDto } from './dto/create-translate-key.dto';
import { FindAllTranslateKeyDto } from './dto/find-all-translate-key.dto';
import { TranslateKey } from './entities/translate-key.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TranslateKeysController', () => {
  let controller: TranslateKeysController;
  let service: TranslateKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslateKeysController],
      providers: [
        TranslateKeysService,
        {
          provide: getRepositoryToken(TranslateKey),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<TranslateKeysController>(TranslateKeysController);
    service = module.get<TranslateKeysService>(TranslateKeysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a translation key', async () => {
      const createTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const translateKey = { ...createTranslateKeyDto, id: 1 };

      jest.spyOn(service, 'create').mockResolvedValueOnce({
        message: 'Clave de traducción creada correctamente',
        data: translateKey,
      });

      const result = await controller.create(createTranslateKeyDto);

      expect(result).toEqual({
        message: 'Clave de traducción creada correctamente',
        data: translateKey,
      });
    });

    it('should throw BadRequestException if translation key already exists', async () => {
      const createTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const badRequestException = new BadRequestException(
        'La clave de traducción ya existe',
      );

      jest.spyOn(service, 'create').mockRejectedValue(badRequestException);

      await expect(controller.create(createTranslateKeyDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of translation keys', async () => {
      const params: FindAllTranslateKeyDto = {
        page: 1,
        limit: 10,
        module: 'planets',
        language: 'es',
        key: 'name',
      };

      const result = {
        success: true,
        message: 'Lista de claves de traducción',
        data: [
          {
            id: 1,
            key: 'name',
            language: 'es',
            module: 'planets',
            value: 'nombre',
          },
        ],
        pagination: {
          page: params.page,
          limit: params.limit,
          total: 1,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(result);

      expect(
        await controller.findAll(
          params.page,
          params.limit,
          params.module,
          params.language,
          params.key,
        ),
      ).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a translation key', async () => {
      const id = '1';

      const result = {
        message: 'Clave de traducción encontrada',
        data: {
          id: 1,
          key: 'name',
          language: 'es',
          module: 'planets',
          value: 'nombre',
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(result);

      expect(await controller.findOne(id)).toBe(result);
    });

    it('should throw NotFoundException if translation key does not exist', async () => {
      const id = '1';

      const notFoundException = new NotFoundException(
        'Clave de traducción no encontrada',
      );

      jest.spyOn(service, 'findOne').mockRejectedValue(notFoundException);

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a translation key', async () => {
      const id = '1';
      const updateTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'minombre',
      };

      const result = {
        message: 'Clave de traducción actualizada correctamente',
        data: {
          id: 1,
          key: 'name',
          language: 'es',
          module: 'planets',
          value: 'minombre',
        },
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(result);

      expect(await controller.update(id, updateTranslateKeyDto)).toBe(result);
    });

    it('should throw NotFoundException if translation key does not exist', async () => {
      const id = '1';
      const updateTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const notFoundException = new NotFoundException(
        'Clave de traducción no encontrada',
      );

      jest.spyOn(service, 'update').mockRejectedValue(notFoundException);
      await expect(
        controller.update(id, updateTranslateKeyDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if translation key already exists', async () => {
      const id = '1';
      const updateTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const badRequestException = new BadRequestException(
        'La clave de traducción ya existe',
      );

      jest.spyOn(service, 'update').mockRejectedValue(badRequestException);
      await expect(
        controller.update(id, updateTranslateKeyDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if module does not exist', async () => {
      const id = '1';
      const updateTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const badRequestException = new BadRequestException(
        'El módulo no existe',
      );

      jest.spyOn(service, 'update').mockRejectedValue(badRequestException);
      await expect(
        controller.update(id, updateTranslateKeyDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if key does not exist in the module', async () => {
      const id = '1';
      const updateTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const badRequestException = new BadRequestException(
        'La clave de traducción no existe en el módulo',
      );

      jest.spyOn(service, 'update').mockRejectedValue(badRequestException);
      await expect(
        controller.update(id, updateTranslateKeyDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a translation key', async () => {
      const id = '1';

      const result = {
        message: 'Clave de traducción eliminada correctamente',
      };

      jest.spyOn(service, 'remove').mockResolvedValueOnce(result);

      expect(await controller.remove(id)).toBe(result);
    });

    it('should throw NotFoundException if translation key does not exist', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockRejectedValueOnce({
        message: 'Clave de traducción no encontrada',
      });

      try {
        await controller.remove(id);
      } catch (error) {
        expect(error).toEqual({
          message: 'Clave de traducción no encontrada',
        });
      }
    });
  });
});
