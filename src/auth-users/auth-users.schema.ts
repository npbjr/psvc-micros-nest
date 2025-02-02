import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = Users & Document;

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

@Schema()
export class Users {
    @Prop({type: String, unique:true})
    email: string;

    @Prop()
    password: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;
}

export const UsersSchema = SchemaFactory.createForClass(Users);