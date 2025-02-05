import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";


export type PagesDocument = Pages & Document;

@Schema()
export class Pages {

    @Prop()
    title:string

    @Prop()
    endpoint:string

    @Prop()
    pageTemplate:string

    @Prop()
    authorId:string

    @Prop({ default: Date.now })
    dateCreated:Date

    @Prop({ default: Date.now })
    dateModified:Date


}
export const PagesSchema = SchemaFactory.createForClass(Pages)

PagesSchema.pre('save', function (next) {
    this.dateModified = new Date();
    next();
  });