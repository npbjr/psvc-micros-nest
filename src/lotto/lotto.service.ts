import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LottoResult } from './lotto.results.schema';
import { DrawSchedule } from './lotto.drawschedule.schema';

@Injectable()
export class LottoService {
  constructor(
    @InjectRepository(LottoResult) private readonly lottoResult: Repository<LottoResult>,
    @InjectRepository(DrawSchedule) private readonly drawSchedule: Repository<DrawSchedule>,
  ) {}

  async findAll(searchText?: string): Promise<any> {
    const lottoResults = await this.lottoResult.find({
      relations: ['lottoType', 'schedule'],
    });

    const filteredResults = searchText
    ? lottoResults.filter(result => {
        const searchNumbers = searchText.split(' ').map(num => num.trim());

      
        const resultNumbers = result.numbers.split(',').map(num => num.trim());

       
        return searchNumbers.every(searchNum => resultNumbers.includes(searchNum));
      })
    : lottoResults;


    return filteredResults.map(result => ({
      id: result.id,
      numbers: result.numbers,
      drawdate: result.drawdate,
      lottoType: result.lottoType?.name,
      schedule: result.schedule?.time,
    }));
  }
}
