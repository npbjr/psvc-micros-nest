import { Controller, Inject, Param, Patch, Get, Delete, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly comments:CommentsService) {}

    @Post('create')
    async create(@Body() req:any):Promise<any>{
        return await this.comments.create(req)
    }

    @Get()
    async get(): Promise<any>{
        return await this.comments.get();
    }
    @Get(':id')
    async getComment(@Param('id') id:string): Promise<any>{
        return await this.comments.getComment(id);
    }

    @Patch(':id')
    async update(@Param('id') id:string, pagesData:any):Promise<any>{
        return await this.comments.update(id, pagesData)
    }

    @Delete(':id')
    async delete(@Param('id') id:string): Promise<any>{
        return await this.comments.delete(id);
    }
}
