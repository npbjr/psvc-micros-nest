import { Injectable } from '@nestjs/common';
import { Pages, PagesDocument, PagesSchema } from './pages.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class PagesService {
    constructor(@InjectModel(Pages.name) private readonly pages:Model<PagesDocument>){}

    async get():Promise<any>{
        return await this.pages.find().exec();
    }
    async getPage(id:string): Promise<PagesDocument> {
        console.error("ID VALUE:"+id)
            return await this.pages.findById(id).exec();
        }
    async create(pageData:any):Promise<any>{
        return await this.pages.create(pageData);
    }

    async delete(id:string):Promise<any> {
        return await this.pages.findByIdAndDelete(id).exec();
    }

    async update(id:string, pageData:any):Promise<any>{
        return await this.pages.findByIdAndUpdate(id, pageData).exec()
    }
}
