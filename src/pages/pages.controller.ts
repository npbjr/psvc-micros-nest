import { Inject, Param } from "@nestjs/common";
import { Controller, Post, Delete, Patch, Body, Get } from '@nestjs/common';
import { PagesService } from "./pages.service";

@Controller('pages')
export class PagesController {
    constructor(private readonly pages:PagesService) {}

    @Post('create')
    async create(@Body() req:any):Promise<any>{
        return await this.pages.create(req)
    }

    @Get()
    async get(): Promise<any>{
        return await this.pages.get();
    }
    @Get(':id')
    async getPage(@Param('id') id:string): Promise<any>{
        return await this.pages.getPage(id);
    }

    @Patch(':id')
    async update(@Param('id') id:string, pagesData:any):Promise<any>{
        return await this.pages.update(id, pagesData)
    }

    @Delete(':id')
    async delete(@Param('id') id:string): Promise<any>{
        return await this.pages.delete(id);
    }

    @Post('generate')
    async generatePage(@Body() req:any): Promise<any>{
        console.error("GENERATE PAGE:"+req.id)
        return req
    }


    
}
