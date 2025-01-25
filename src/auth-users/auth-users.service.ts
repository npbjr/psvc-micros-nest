import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Users } from './auth-users.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthUsersService implements OnModuleInit {

    constructor(@InjectModel(Users.name) private usersModel: Model<Users>){}

    onModuleInit() {
        //create default admin users
        const admin_users = {
            username:process.env.DEFAULT_APP_ADMIN_USER,
            password:process.env.DEFAULT_APP_ADMIN_PASSWORD,
            role:"ROLE_ADMIN"
        }
        if(this.validateUser(admin_users.username,admin_users.password)==null){
            this.registerUser(admin_users)
        }
        
    }

    async validateUser(username:string, password:string): Promise<any> {
        const user = await this.usersModel.findOne({username}).exec();
        
        if (user && await bcrypt.compare(user.password, password)){
            return user;
        }
        return null;
    }
    async registerUser(userDto:any): Promise<any> {
        this.usersModel.create(userDto)
    }
    async loginUser(username:string, password:string): Promise<any> {
        return await this.validateUser(username, password)
        
    }


}
