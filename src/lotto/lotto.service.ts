import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LottoResult } from './lotto.results.schema';
import { Repository } from 'typeorm';
import { DrawSchedule } from './lotto.drawschedule.schema';
@Injectable()
export class LottoService {
    constructor(@InjectRepository(
        LottoResult) private readonly lottoResult: Repository<LottoResult>,
        @InjectRepository(DrawSchedule) private readonly drawSchedule: Repository<DrawSchedule>
    ){}

    async findAll():Promise<any>{
        return await this.lottoResult.find()
    }

}
