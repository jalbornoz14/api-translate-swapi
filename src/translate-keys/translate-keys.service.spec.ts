import { Test, TestingModule } from '@nestjs/testing';
import { TranslateKeysService } from './translate-keys.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TranslateKey } from './entities/translate-key.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTranslateKeyDto } from './dto/create-translate-key.dto';
import { UpdateTranslateKeyDto } from './dto/update-translate-key.dto';

describe('TranslateKeysService', () => {
  let service: TranslateKeysService;
  let repo: Repository<TranslateKey>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranslateKeysService,
        {
          provide: getRepositoryToken(TranslateKey),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TranslateKeysService>(TranslateKeysService);
    repo = module.get<Repository<TranslateKey>>(
      getRepositoryToken(TranslateKey),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a translation key', async () => {
      const createTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
      jest
        .spyOn(repo, 'create')
        .mockReturnValueOnce(createTranslateKeyDto as any);
      jest
        .spyOn(repo, 'save')
        .mockResolvedValueOnce(createTranslateKeyDto as any);

      const result = await service.create(createTranslateKeyDto);

      expect(result).toEqual({
        message: 'Clave de traducción creada correctamente',
        data: createTranslateKeyDto,
      });
    });

    it('should throw BadRequestException if translation key already exists', async () => {
      const createTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };
      jest
        .spyOn(repo, 'findOne')
        .mockResolvedValueOnce(createTranslateKeyDto as any);

      await expect(service.create(createTranslateKeyDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if module does not exist', async () => {
      const createTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const badRequestException = new BadRequestException(
        'El módulo no es válido',
      );

      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
      jest
        .spyOn(service, 'validatedModule')
        .mockRejectedValue(badRequestException);

      await expect(service.create(createTranslateKeyDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if key does not exist in the module', async () => {
      const createTranslateKeyDto: CreateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const badRequestException = new BadRequestException(
        'La clave no es válida para el módulo',
      );

      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
      jest
        .spyOn(service, 'validatedModule')
        .mockRejectedValue(badRequestException);

      await expect(service.create(createTranslateKeyDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of translation keys', async () => {
      const translateKeys: TranslateKey[] = [
        {
          id: 1,
          key: 'name',
          language: 'es',
          module: 'planets',
          value: 'nombre',
        },
        {
          id: 2,
          key: 'name',
          language: 'en',
          module: 'planets',
          value: 'name',
        },
      ];
      jest
        .spyOn(repo, 'findAndCount')
        .mockResolvedValueOnce([translateKeys, translateKeys.length] as any);

      const result = await service.findAll({
        page: 1,
        limit: 10,
        key: 'name',
      });

      expect(result).toEqual({
        success: true,
        message: 'Lista de claves de traducción',
        data: translateKeys,
        pagination: {
          page: 1,
          limit: 10,
          total: translateKeys.length,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a translation key', async () => {
      const translateKey: TranslateKey = {
        id: 1,
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(translateKey as any);

      const result = await service.findOne(translateKey.id);

      expect(result).toEqual({
        message: 'Clave de traducción encontrada',
        data: translateKey,
      });
    });

    it('should throw NotFoundException if translation key does not exist', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a translation key', async () => {
      const translateKey: TranslateKey = {
        id: 1,
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };
      const updateTranslateKeyDto: UpdateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      const updatedTranslateKey: TranslateKey = {
        id: 1,
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };

      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(translateKey as any);
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(service, 'validatedModule').mockResolvedValueOnce(undefined);
      jest
        .spyOn(repo, 'create')
        .mockReturnValueOnce(updatedTranslateKey as any);
      jest.spyOn(repo, 'update').mockResolvedValueOnce({ affected: 1 } as any);

      const result = await service.update(
        translateKey.id,
        updateTranslateKeyDto,
      );

      expect(result).toEqual({
        message: 'Clave de traducción actualizada correctamente',
        data: updatedTranslateKey,
      });
    });

    it('should throw NotFoundException if translation key does not exist', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

      await expect(
        service.update(1, {
          key: 'name',
          language: 'es',
          module: 'planets',
          value: 'nombre',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if translation key already exists', async () => {
      const translateKey: TranslateKey = {
        id: 1,
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };
      const updateTranslateKeyDto: UpdateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'minombre',
      };

      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(translateKey as any);
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(translateKey as any);

      await expect(
        service.update(translateKey.id, updateTranslateKeyDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if module does not exist', async () => {
      const translateKey: TranslateKey = {
        id: 1,
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };
      const updateTranslateKeyDto: UpdateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'minombre',
      };

      const badRequestException = new BadRequestException(
        'El módulo no es válido',
      );

      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(translateKey as any);
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
      jest
        .spyOn(service, 'validatedModule')
        .mockRejectedValue(badRequestException);

      await expect(
        service.update(translateKey.id, updateTranslateKeyDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if key does not exist in the module', async () => {
      const translateKey: TranslateKey = {
        id: 1,
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };
      const updateTranslateKeyDto: UpdateTranslateKeyDto = {
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'minombre',
      };

      const badRequestException = new BadRequestException(
        'La clave no es válida para el módulo',
      );

      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(translateKey as any);
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
      jest
        .spyOn(service, 'validatedModule')
        .mockRejectedValue(badRequestException);

      await expect(
        service.update(translateKey.id, updateTranslateKeyDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a translation key', async () => {
      const translateKey: TranslateKey = {
        id: 1,
        key: 'name',
        language: 'es',
        module: 'planets',
        value: 'nombre',
      };
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(translateKey as any);
      jest.spyOn(repo, 'delete').mockResolvedValueOnce({ affected: 1 } as any);

      const result = await service.remove(translateKey.id);

      expect(result).toEqual({
        message: 'Clave de traducción eliminada correctamente',
      });
    });

    it('should throw NotFoundException if translation key does not exist', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findKeys', () => {
    it('should return an array of translation keys', async () => {
      const translateKeys: TranslateKey[] = [
        {
          id: 1,
          key: 'name',
          language: 'es',
          module: 'planets',
          value: 'nombre',
        },
        {
          id: 2,
          key: 'name',
          language: 'en',
          module: 'planets',
          value: 'name',
        },
      ];
      jest
        .spyOn(repo, 'findAndCount')
        .mockResolvedValueOnce([translateKeys, 2] as any);

      const result = await service.findKeys('planets', 'es');

      expect(result).toEqual(translateKeys);
    });
  });
});
