import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";

export type UserDocument = Users & Document;

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

@Schema()
export class Users {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;
}

export const UsersSchema = SchemaFactory.createForClass(Users);