import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateTranslateKeyDto } from './dto/create-translate-key.dto';
import { UpdateTranslateKeyDto } from './dto/update-translate-key.dto';
import { TranslateKey } from './entities/translate-key.entity';
import { FindAllTranslateKeyDto } from './dto/find-all-translate-key.dto';
import {
  CreateTranslateKey,
  DeleteTranslateKey,
  FindAllTranslateKey,
  FindOneTranslateKey,
  UpdateTranslateKey,
} from './interfaces/translate-key.interface';

@Injectable()
export class TranslateKeysService {
  constructor(
    @InjectRepository(TranslateKey)
    private readonly translateKeyRepository: Repository<TranslateKey>,
  ) {}

  async create(
    createTranslateKeyDto: CreateTranslateKeyDto,
  ): Promise<CreateTranslateKey> {
    await this.validatedModule(
      createTranslateKeyDto.module,
      createTranslateKeyDto.key,
    );

    const findKey = await this.translateKeyRepository.findOne({
      where: {
        module: createTranslateKeyDto.module,
        language: createTranslateKeyDto.language,
        key: createTranslateKeyDto.key,
      },
    });

    if (findKey) {
      throw new BadRequestException('La clave de traducción ya existe');
    }

    const newTranslateKey = this.translateKeyRepository.create(
      createTranslateKeyDto,
    );

    const translateKey = await this.translateKeyRepository.save(
      newTranslateKey,
    );

    return {
      message: 'Clave de traducción creada correctamente',
      data: translateKey,
    };
  }

  async findAll(params: FindAllTranslateKeyDto): Promise<FindAllTranslateKey> {
    const { page, limit, module, language, key } = params;
    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<TranslateKey> = {};

    if (module) {
      where.module = Like(`%${module}%`);
    }

    if (language) {
      where.language = Like(`%${language}%`);
    }

    if (key) {
      where.key = Like(`%${key}%`);
    }

    const [translateKeys, total] =
      await this.translateKeyRepository.findAndCount({
        where,
        take: limit,
        skip,
      });

    return {
      success: true,
      message: 'Lista de claves de traducción',
      data: translateKeys,
      pagination: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: number): Promise<FindOneTranslateKey> {
    const findKey = await this.translateKeyRepository.findOne({
      where: { id },
    });

    if (!findKey) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Clave de traducción no encontrada',
      });
    }

    return {
      message: 'Clave de traducción encontrada',
      data: findKey,
    };
  }

  async update(
    id: number,
    updateTranslateKeyDto: UpdateTranslateKeyDto,
  ): Promise<UpdateTranslateKey> {
    const findKey = await this.translateKeyRepository.findOne({
      where: { id },
    });

    if (!findKey) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Clave de traducción no encontrada',
      });
    }

    const module = updateTranslateKeyDto.module
      ? updateTranslateKeyDto.module
      : findKey.module;
    const language = updateTranslateKeyDto.language
      ? updateTranslateKeyDto.language
      : findKey.language;
    const key = updateTranslateKeyDto.key
      ? updateTranslateKeyDto.key
      : findKey.key;

    const findKeyUpdate = await this.translateKeyRepository.findOne({
      where: {
        module,
        language,
        key,
      },
    });

    if (findKeyUpdate) {
      throw new BadRequestException('La clave de traducción ya existe');
    }

    await this.validatedModule(module, key);

    const translateKey = this.translateKeyRepository.create(
      updateTranslateKeyDto,
    );

    await this.translateKeyRepository.update({ id }, translateKey);

    return {
      message: 'Clave de traducción actualizada correctamente',
      data: translateKey,
    };
  }

  async remove(id: number): Promise<DeleteTranslateKey> {
    const findKey = await this.translateKeyRepository.findOne({
      where: { id },
    });

    if (!findKey) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Clave de traducción no encontrada',
      });
    }

    this.translateKeyRepository.delete({ id });

    return {
      message: 'Clave de traducción eliminada correctamente',
    };
  }

  async validatedModule(
    module: string,
    key: string,
  ): Promise<true | BadRequestException> {
    const schemaModule = await fetch(
      `https://swapi.py4e.com/api/${module}/schema`,
    )
      .then((res) => res.json())
      .catch((err) => {
        throw new BadRequestException('El módulo no es válido', err);
      });

    const schema: Array<string> = schemaModule.required;

    for (const _key of schema) {
      if (_key === key) {
        return true;
      }
    }

    throw new BadRequestException('La clave no es válida para el módulo');
  }

  async findKeys(module: string, language: string): Promise<TranslateKey[]> {
    const [keys, count] = await this.translateKeyRepository.findAndCount({
      where: { module, language },
    });
    if (count === 0) {
      return null;
    }
    return keys;
  }
}
