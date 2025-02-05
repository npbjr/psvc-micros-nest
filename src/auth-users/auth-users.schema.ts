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

    @Prop()
    accountStatus:string

    @Prop()
    profilePicture:string

    @Prop({ default: Date.now })
    dateCreated:Date

    @Prop({ default: Date.now })
    dateModified:Date

}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre('save', function (next) {
    this.dateModified = new Date();
    next();
  });