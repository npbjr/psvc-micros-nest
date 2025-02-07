import { Test, TestingModule } from '@nestjs/testing';
import { LottoController } from './lotto.controller';

describe('LottoController', () => {
  let controller: LottoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LottoController],
    }).compile();

    controller = module.get<LottoController>(LottoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
