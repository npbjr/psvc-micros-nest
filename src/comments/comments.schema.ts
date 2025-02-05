
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CommentsDocument = Comments & Document;

@Schema()
export class Comments {

    @Prop()
    name:string

    @Prop()
    comment: string

    @Prop()
    pageId: string

    @Prop()
    likes: string

    @Prop()
    dislikes:string


    @Prop({ default: Date.now })
    dateCreated:Date

    @Prop({ default: Date.now })
    dateModified:Date

}

export const CommentsSchema = SchemaFactory.createForClass(Comments)

CommentsSchema.pre('save', function (next) {
    this.dateModified = new Date();
    next();
  });