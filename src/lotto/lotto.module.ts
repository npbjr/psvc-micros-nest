import { Module } from '@nestjs/common';
import { LottoController } from './lotto.controller';
import { LottoService } from './lotto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LottoResult } from './lotto.results.schema';
import { DrawSchedule } from './lotto.drawschedule.schema';
import { LottoType } from './lotto.lottotype.schema';

@Module({
  imports: [TypeOrmModule.forFeature([LottoResult,DrawSchedule, LottoType])],
  controllers: [LottoController],
  providers: [LottoService]
})
export class LottoModule {}
