
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


}

export const CommentsSchema = SchemaFactory.createForClass(Comments)