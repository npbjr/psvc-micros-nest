import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<Users>


@Schema()
export class Users {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    role: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);