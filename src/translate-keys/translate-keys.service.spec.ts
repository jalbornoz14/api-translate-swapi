import { Test, TestingModule } from '@nestjs/testing';
import { TranslateKeysService } from './translate-keys.service';

describe('TranslateKeysService', () => {
  let service: TranslateKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateKeysService],
    }).compile();

    service = module.get<TranslateKeysService>(TranslateKeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
