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



}
export const PagesSchema = SchemaFactory.createForClass(Pages)