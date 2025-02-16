import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LottoResult } from './lotto.results.schema';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { LottoAIService } from './lotto.rest.gemini';
@Injectable()
export class LottoService {
  constructor(
    @InjectRepository(LottoResult) private readonly lottoResult: Repository<LottoResult>,
  ) {}
  private lottoAIService = new LottoAIService();
  

  async scrape(url: string): Promise<any[]> {
    try {
      url = "https://www.pcso.gov.ph/searchlottoresult.aspx"
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const results = [];

      $('table#cphContainer_cpContent_GridView1 tbody tr').each((index, element) => {
        if (index === 0) return; // Skip the header row

        const cols = $(element).find('td');
        const lottoResult = {
          game: $(cols[0]).text().trim(),
          combinations: $(cols[1]).text().trim(),
          drawDate: $(cols[2]).text().trim(),
          jackpot: parseFloat($(cols[3]).text().replace(/,/g, '').trim()),
          winners: parseInt($(cols[4]).text().trim(), 10),
        };

        results.push(lottoResult);
      });

      return results;
    } catch (error) {
      console.error('Error scraping lotto results:', error);
      throw new Error('Failed to scrape lotto results');
    }
  }

  async searchAI(searchText?: string): Promise<any> {

    const lottoResults = await this.lottoResult.find({
      relations: ['gameType'],
    });

    return await this.lottoAIService.checkLottoNumbers(searchText, JSON.stringify(lottoResults))

  }
  async findAll(searchText?: string): Promise<any> {

    const lottoResults = await this.lottoResult.find({
      relations: ['gameType'],
    });

    const filteredResults = searchText
    ? lottoResults.filter(result => {
        const searchNumbers = searchText.split(' ').map(num => num.trim());

      
        const resultNumbers = result.combinations.split('-').map(num => num.trim());

       
        return searchNumbers.every(searchNum => resultNumbers.includes(searchNum));
      })
    : lottoResults;


    return filteredResults.map(result => ({
      id: result.id,
      combinations: result.combinations,
      drawdate: result.drawDate,
      gameType: result.gameType?.name
    }));
  }
}
