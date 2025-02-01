import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentsSchema, CommentsDocument, Comments } from './comments.schema';
import { Model } from 'mongoose';
@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comments.name) private readonly commentsModel:Model<CommentsDocument>) {}
    async get():Promise<any>{
        return await this.commentsModel.find().exec();
    }
    async getComment(id:string):Promise<any>{
        return await this.commentsModel.findById(id).exec();
    }
    async create(commentsData:any): Promise<any> {
        return await this.commentsModel.create(commentsData)
    }

    async delete(id:string): Promise<any> {
        return await this.commentsModel.findByIdAndDelete(id).exec();
    }

    async update(id:string, commentsData:any):Promise<any>{
        return await this.commentsModel.findByIdAndUpdate(id, commentsData).exec()
    }
}
