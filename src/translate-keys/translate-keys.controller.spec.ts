import { Test, TestingModule } from '@nestjs/testing';
import { TranslateKeysController } from './translate-keys.controller';
import { TranslateKeysService } from './translate-keys.service';

describe('TranslateKeysController', () => {
  let controller: TranslateKeysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslateKeysController],
      providers: [TranslateKeysService],
    }).compile();

    controller = module.get<TranslateKeysController>(TranslateKeysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
