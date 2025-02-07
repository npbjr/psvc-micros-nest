import { Test, TestingModule } from '@nestjs/testing';
import { LottoService } from './lotto.service';

describe('LottoService', () => {
  let service: LottoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LottoService],
    }).compile();

    service = module.get<LottoService>(LottoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
