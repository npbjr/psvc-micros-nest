import { Module } from '@nestjs/common';
import { LottoController } from './lotto.controller';
import { LottoService } from './lotto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LottoResult } from './lotto.results.schema';
import { GameType } from './lotto.gametype.schema';

@Module({
  imports: [TypeOrmModule.forFeature([LottoResult, GameType])],
  controllers: [LottoController],
  providers: [LottoService]
})
export class LottoModule {}
