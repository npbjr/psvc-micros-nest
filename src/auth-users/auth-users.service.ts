import { Inject, Injectable } from '@nestjs/common';
import { InjectModel, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Users } from './auth-users.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt";

interface userCreds {
    username:string,
    password:string
}

@Injectable()
export class AuthUsersService {

        constructor(@InjectModel(Users.name) private usersModel: Model<Users>){}

        async registerUser(userDto:any): Promise<any> {

            this.usersModel.create(userDto)
        }

        async loginUser(creds:userCreds): Promise<any> {
            const userExist:boolean = false;
            const username = creds.username;
            const user = await this.usersModel.findOne({username}).exec();
            
            // if (user && await bcrypt.compare(user.password))
        }


}
