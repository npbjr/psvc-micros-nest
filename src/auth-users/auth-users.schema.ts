import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";

export type UserDocument = Users & Document;


@Schema()
export class Users {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);