import { Controller, Get } from '@nestjs/common';
import { LottoService } from './lotto.service';

@Controller('lotto')
export class LottoController {
    constructor(private readonly lottoService:LottoService){}
    @Get('result')
    async findAll(): Promise<any> {
        return await this.lottoService.findAll()
    }
}
