import { Injectable } from '@nestjs/common';
import { CreateTranslateKeyDto } from './dto/create-translate-key.dto';
import { UpdateTranslateKeyDto } from './dto/update-translate-key.dto';

@Injectable()
export class TranslateKeysService {
  create(createTranslateKeyDto: CreateTranslateKeyDto) {
    return 'This action adds a new translateKey';
  }

  findAll() {
    return `This action returns all translateKeys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translateKey`;
  }

  update(id: number, updateTranslateKeyDto: UpdateTranslateKeyDto) {
    return `This action updates a #${id} translateKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} translateKey`;
  }
}
