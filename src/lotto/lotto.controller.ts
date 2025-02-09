import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { LottoService } from './lotto.service';

@Controller('lotto')
export class LottoController {
    constructor(private readonly lottoService:LottoService){}
    @Get('result')
    async findAll(@Query('searchText') searchText: string): Promise<any> {
        console.error("any", searchText)
        return await this.lottoService.findAll(searchText)
    }
}
